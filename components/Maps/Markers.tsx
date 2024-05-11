import React, {useContext} from 'react'
import {Marker} from 'react-map-gl'
import { UserLocationContext } from '@/context/UserLocationContext';
import { SourceCoordContext } from '@/context/SourceCoordContext'
import { DestCoordContext } from '@/context/DestCoordContext'

function Markers() {
  const{userLocation,setUserLocation}=useContext(UserLocationContext);
  const{sourceCoord,setSourceCoord}=useContext(SourceCoordContext)
  const{destCoord,setDestCoord}=useContext(DestCoordContext)
  
  return (
    <div>
      {/*User Marker*/}
        <Marker 
            latitude={userLocation?.lat}
            longitude={userLocation?.lon}
            anchor='bottom'>

            <img src='./pin.png'
            className='w-8 h-8'/>
        </Marker>
        
        {/*Source Marker*/}
        {sourceCoord.length!=0 ? <Marker 
            latitude={sourceCoord?.lat}
            longitude={sourceCoord?.lon}
            anchor='bottom'>

            <img src='./pin.png'
            className='w-8 h-8'/>
        </Marker> : null}
        
        {/*Destination Marker*/}
        {destCoord.length!=0 ? <Marker 
            latitude={destCoord?.lat}
            longitude={destCoord?.lon}
            anchor='bottom'>

            <img src='./pin.png'
            className='w-8 h-8'/>
        </Marker> : null}
    </div>
  )
}

export default Markers