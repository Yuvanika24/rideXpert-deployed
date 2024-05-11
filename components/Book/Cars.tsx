'use client'
import carList from '@/data/carList'
import React, {useContext, useState} from 'react'
import Image from 'next/image'
import { DirectionDataContext } from '@/context/DirectionDataContext'
import { SelectedCarAmountContext } from '@/context/SelectedCarAmountContext'

function Cars() {
    const [selectedCar,setSelectedCar]=useState<any>()
    const {directionData,setDirectionData}=useContext(DirectionDataContext)
 
    const {selectedCarAmount,setSelectedCarAmount}=useContext(SelectedCarAmountContext)

    const getCost=(charges:any)=>{
        const distinKms = directionData?.routes[0]?.distance /1000
        const cost = charges * distinKms
        return (cost.toFixed(0))
    }
    
    return (
        <div className='mt-3'>
            <h2 className='font-semibold'>Select Car</h2>
            <div className='grid grid-cols-3 md:grid-cols-1 lg:grid-cols-3'>
                {carList.map((value,index)=>(
                    <div key={index}
                    className={`m-2 p-2 border-[2px] rounded-md hover:border-blue-500 cursor-pointer ${index == selectedCar ? 'border-blue-500' : null }`}
                    onClick={()=>{setSelectedCar(index)
                    setSelectedCarAmount(getCost(value.charge))}}>
                     
                        <Image src={value.image}
                        alt={value.name}
                        height={90}
                        width={75}
                        className='w-full'
                        />
                        
                        <h2 className={`text-sm text-gray-500 px-5 ${index==selectedCar ? 'text-black' : null}`}> 
                            {value.name}
                            {directionData.routes?
                                <span className={'float-right font-small text-gray-500'}>
                                    {getCost(value.charge)}
                                </span> : null}
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Cars