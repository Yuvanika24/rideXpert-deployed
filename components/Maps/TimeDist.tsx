import React, { useContext } from 'react'
import { DirectionDataContext } from '@/context/DirectionDataContext'

function TimeDist() {

    const {directionData,setDirectionData}=useContext(DirectionDataContext)
    
    return directionData?.routes && (
        <div className='bg-blue-500 p-3 rounded-md border-[2px] border-black'>
            <h2 className='text-blue-100  text-[15px] font-bold'>
                Distance : <span className='mr-3 text-black'>
                    {(directionData.routes[0].distance/1000).toFixed(2)} Kms
                </span>
                Duration : <span className=' text-black'>
                    {(directionData.routes[0].duration/60).toFixed(0)} Mins
                </span>
            </h2>
        </div>
    )
}

export default TimeDist