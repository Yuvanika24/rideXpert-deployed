import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'

function NavBar() {
  return (
    <div className='flex justify-between p-5 px-10 border-b-[2px] shadow-md'>
      <div className='flex gap-10 items-center'>
        <Image 
          src='/logo.png'
          alt='logo'
          width={60}
          height={60}
          className='border-[2px] rounded-full border-blue-500'
        />
        <div className='hidden md:flex gap-6'>
            <h1 className='hover:bg-blue-200  text-[20px] hover:font-bold p-2 px-4 rounded-md cursor-pointer transition-all'>Home</h1>
            <h1 className='hover:bg-blue-200  text-[20px] hover:font-bold p-2 px-4 rounded-md cursor-pointer transition-all'>History</h1>
            <h1 className='hover:bg-blue-200  text-[20px] hover:font-bold p-2 px-4 rounded-md cursor-pointer transition-all'>Help</h1>
        </div>
      </div>
      <UserButton />
    </div>
  )
}

export default NavBar