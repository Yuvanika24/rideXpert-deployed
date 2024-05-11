import React, { useContext, useState } from 'react'
import AutoCompleteAddress from './AutoCompleteAddress'
import Cars from './Cars'
import { useRouter } from 'next/navigation'
import { SelectedCarAmountContext } from '@/context/SelectedCarAmountContext'

function Booking() {
  const[amount,setAmount]=useState<any>()
  const {selectedCarAmount,setSelectedCarAmount}=useContext(SelectedCarAmountContext)
  
  const router:any=useRouter()

  return (
    <div className='p-5'>
      <h2 className='font-bold text-lg'> Book My Taxi </h2>
      <div className='mt-3 border-[2px] px-5 p-3 rounded-md'>
        <AutoCompleteAddress/>
        <Cars/>
      
        <button className={`w-full mt-2 p-2 font-semibold bg-blue-500 rounded-md ${!selectedCarAmount? 'bg-gray-200':null}`}
        
        onClick={()=>router.push('/payment')}>Book</button>
      </div>
    </div>
  )
}

export default Booking