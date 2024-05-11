
'use client'
import paymentMethod from '@/data/paymentMethod'
import React , {useState} from 'react'
import Image from 'next/image'

function Payment() {
    const[selectedPayment,setSelectedPayment]=useState<any>()
    return (
    <div className='mt-3'>
        <h2 className='font-semibold'>Payment Method</h2>
        <div className='grid grid-cols-4'>
            {paymentMethod.map((value:any,index:number)=>(
                <div key={index}
                    className={`m-2 px-4 hover:border-blue-500 hover:border-[2px] rounded-md cursor-pointer ${index==selectedPayment ? 'border-[2px] border-blue-500 rounded-md' : null }`}
                    onClick={()=>setSelectedPayment(index)} 
                >   
                    <Image src={value.image}
                    alt={value.name}
                    height={70}
                    width={70}
                    className='mt-2'
                    />
                </div>
            ))}
        </div>
    </div>
  )
}

export default Payment