import { DestCoordContext } from '@/context/DestCoordContext'
import { SourceCoordContext } from '@/context/SourceCoordContext'
import React, { useContext, useEffect, useState } from 'react'

const sessionToken='?session_token=f6b778b8-4194-4646-a887-0997f6dd4a77'
const MAPBOX_RETRIEVE_URL='https://api.mapbox.com/search/searchbox/v1/retrieve/'

function AutoCompleteAddress() {

    const[source,setSource]=useState<any>()
    const[destination,setDestination]=useState<any>()

    const[sourceChange,setSourceChange]=useState<any>(false)
    const[destinationChange,setDestinationChange]=useState<any>(false)

    const [addressList,setAddressList]=useState<any>([])

    const{sourceCoord,setSourceCoord}=useContext(SourceCoordContext)
    const{destCoord,setDestCoord}=useContext(DestCoordContext)

    const getAddressList=async()=>{
        setAddressList([]);
        const query = sourceChange ? source : destination; 
        if(query){
            const res= await fetch('/api/search-address?q='+ query,
            {
                headers:{
                    'Content-type':'application/json'
                }
            });
        const result= await res.json();
        setAddressList(result);
        }
    }

    useEffect(()=>{
        const delay=setTimeout(()=>{
            getAddressList()
        },1000)
        return()=>clearTimeout(delay)
    },[source,destination, getAddressList]); // Include getAddressList in the dependency array

    const onSourceClick=async(item:any)=>{
        setSource(item.full_address);
        setAddressList([]);
        setSourceChange(false);

        const response = await fetch(MAPBOX_RETRIEVE_URL+item.mapbox_id+sessionToken+'&access_token='+process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN)
        const result= await response.json()

        console.log(result)

        setSourceCoord({
            lon:result.features[0].geometry.coordinates[0],
            lat:result.features[0].geometry.coordinates[1]
        })
    }

    const onDestClick=async(item:any)=>{
        setDestination(item.full_address);
        setAddressList([]);
        setDestinationChange(false);

        const response = await fetch(MAPBOX_RETRIEVE_URL+item.mapbox_id+sessionToken+'&access_token='+process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN)
        const result= await response.json()

        console.log(result)

        setDestCoord({
            lon:result.features[0].geometry.coordinates[0],
            lat:result.features[0].geometry.coordinates[1]
        })
    }

    return (
    <div className='overflow-hidden'>
        <div className='relative'>
            <label className='text-gray-500'>Pick up</label>
            <input 
            type='text'
            className='w-full outline-none border-[2px] rounded-md p-1 focus:border-blue-500'
            value={source}
            onChange={(e)=>{setSource(e.target.value);setSourceChange(true)}}
            />

            {addressList?.suggestions && sourceChange ?
            <div className='mt-2'>
                {addressList?.suggestions.map((item:any, index:number)=>(
                    <h2 key={index} 
                    className='hover:bg-blue-100 p-2 cursor-pointer rounded-md'
                    onClick={()=>{ onSourceClick(item) }}>
                        
                    {item.full_address}

                    </h2>
                ))}
            </div> : null}
        </div>
        <div className='mt-3'>
            <label className='text-gray-500'>Drop</label>
            <input 
            type='text'
            className='w-full outline-none border-[2px] rounded-md p-1 focus:border-blue-500'
            value={destination}
            onChange={(e)=>{setDestination(e.target.value);setDestinationChange(true)}}
            />
            {addressList?.suggestions && destinationChange ?
            <div className='mt-2'>
                {addressList?.suggestions.map((item:any, index:number)=>(
                    <h2 key={index} 
                    className='hover:bg-blue-100 p-2 cursor-pointer rounded-md'
                    onClick={()=>{ onDestClick(item) }}>
                        
                        {item.full_address}

                    </h2>
                ))}  
            </div>:null}
        </div>
    </div>
  )
}

export default AutoCompleteAddress
