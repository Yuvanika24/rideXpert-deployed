'use client'

import Booking from "@/components/Book/Booking";
import MapBox from "@/components/Maps/MapBox";
import { useEffect, useState } from "react";
import { UserLocationContext } from "@/context/UserLocationContext";
import { SourceCoordContext } from "@/context/SourceCoordContext";
import { DestCoordContext } from "@/context/DestCoordContext";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import { SelectedCarAmountContext } from "@/context/SelectedCarAmountContext";

export default function Home() {
  const [userLocation,setUserLocation]=useState<any>();

  const[sourceCoord,setSourceCoord]=useState<any>([])
  const[destCoord,setDestCoord]=useState<any>([])

  const[directionData,setDirectionData]=useState<any>([])

  const[selectedCarAmount,setSelectedCarAmount]=useState<any>()

  useEffect(()=>{
    getuserLocation();
  },[])

  const getuserLocation=()=>{
    navigator.geolocation.getCurrentPosition(function(position){
      setUserLocation({
        lat:position.coords.latitude,
        lon:position.coords.longitude
      })
    })
  }
  
  return (
    <div>
      <UserLocationContext.Provider value={{userLocation,setUserLocation}}>
        <SourceCoordContext.Provider value={{sourceCoord,setSourceCoord}}>
          <DestCoordContext.Provider value={{destCoord,setDestCoord}}>
            <DirectionDataContext.Provider value={{directionData,setDirectionData}}>
              <SelectedCarAmountContext.Provider value={{selectedCarAmount,setSelectedCarAmount}}>
                <div className='grid grid-cols-1 md:grid-cols-3'>
                  <div className='mt-5 px-5'>
                    <Booking/>
                  </div>
                  <div className='col-span-2 mt-5 px-5'>
                    <MapBox/>
                  </div>
                </div>
              </SelectedCarAmountContext.Provider>
            </DirectionDataContext.Provider>
          </DestCoordContext.Provider>
        </SourceCoordContext.Provider>
      </UserLocationContext.Provider>
    </div>
  );
}

