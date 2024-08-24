import React from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

const HeroSection = () => {
  return (
    <div className='text-center'>
      <div className='flex flex-col gap-5 my-10'>
      <span className='m-auto px-4 py-2 rounded-full bg-gray-100 text-red-500 font-medium'>No.1 Job Hunt Website</span>
      <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-purple-500'>Dream Jobs</span></h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum repudiandae placeat magni error tempore!
      </p>
      <div className='flex w-[40%] shadow-lg border border-gray-100 pl-3 rounded-full items-center gap-4 mx-auto'>
        <input type='text' placeholder='Search Your Dream Job' className='w-full  border-none outline-none' />
        <Button className='bg-purple-500 text-white rounded-r-full'>
            <Search className='h-5 w-5' />    
        </Button>
      </div>
      </div>
    </div>
  )
}

export default HeroSection