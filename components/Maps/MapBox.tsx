'use client'
import React, { useContext, useEffect, useRef } from 'react'
import { Map, Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Markers from './Markers'
import { UserLocationContext } from '@/context/UserLocationContext'
import { SourceCoordContext } from '@/context/SourceCoordContext'
import { DestCoordContext } from '@/context/DestCoordContext'
import { DirectionDataContext } from '@/context/DirectionDataContext'
import MapBoxRoute from './MapBoxRoute'
import TimeDist from './TimeDist'

const MAPBOX_DRIVING_ENDPOINT='https://api.mapbox.com/directions/v5/mapbox/driving/'

function MapBox() {

  const mapRef=useRef<any>();

  const {userLocation,setUserLocation}=useContext(UserLocationContext);
  const{sourceCoord,setSourceCoord}=useContext(SourceCoordContext);
  const{destCoord,setDestCoord}=useContext(DestCoordContext);

  const{directionData,setDirectionData}=useContext(DirectionDataContext);

  useEffect(()=>{
      if(sourceCoord){
        mapRef.current?.flyTo({
          center:[sourceCoord.lon, sourceCoord.lat],
          duration:2500
        })
      }
  },[sourceCoord])

  useEffect(()=>{
    if(destCoord){
      mapRef.current?.flyTo({
        center:[destCoord.lon, destCoord.lat],
        duration:1000
      })
    }
    if(sourceCoord && destCoord){
      getDirectionRoute()
    }
  },[destCoord])

  const getDirectionRoute=async()=>{
    const response= await fetch(MAPBOX_DRIVING_ENDPOINT+
      sourceCoord.lon+','+ sourceCoord.lat+';'+
      destCoord.lon+','+ destCoord.lat+
      '?overview=full&geometries=geojson'+
      '&access_token='+process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      {
        headers:{
          'Content-type':'application/json',
        }
      });

    const result=await response.json()
    setDirectionData(result)
  }

 
  return (
    <div className='mt-5'>
      <h2 className='font-bold text-lg '>Map</h2>
      <div className='rounded-lg overflow-hidden border-[2px]'>
        {userLocation ?
          <Map 
            ref={mapRef}

            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            
            initialViewState={{
              longitude: userLocation?.lon,
              latitude: userLocation?.lat,
              zoom: 12
            }}

            style={{width:'100%', height: 600}}
            mapStyle="mapbox://styles/mapbox/streets-v9" >

            <Markers/> {/* user, source, dest marker */}

            {/*to draw route*/}
            
            {directionData?.routes ? (
            
            <MapBoxRoute
              coordinates={directionData?.routes[0]?.geometry?.coordinates}
            />)  : null }

          </Map> : null }
      </div>
      <div className='absolute right-10 bottom-[160px]'>
        <TimeDist/>
      </div>
    </div>
  )
}

export default MapBox