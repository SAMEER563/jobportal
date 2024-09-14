import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'



const Job = () => {
  const navigate = useNavigate();
  const jobId = 1;
  return (
    <div className='p-5 rounded-md shadow-lg border border-gray-100'>
      <div className='flex items-center justify-between'>
      <p className='text-sm text-gray-500'>2 Days ago</p>
      <Button variant='outline' classname='rounded-full'><Bookmark/></Button>
      </div>
        <div className='flex items-center gap-2 my-2'>
        <Button classname='p-6' variant='outline' size='icon'>
        <Avatar>
          <AvatarImage src='https://i.pinimg.com/originals/f4/cf/ec/f4cfec4f3b4bbf24798b26aa4a5508f2.png'  />
        </Avatar>
      </Button>
      <div>
        <h1 className='text-lg font-medium'>Company Name</h1>
        <p className='text-sm text-gray-500'>India</p>
      </div>
        </div>
        <div >
          <h1 className='font-bold'>Job Title</h1>
          <p className='text-sm text-gray-500'>Job Description</p>
        </div>
        <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-500 font-bold"} variant="ghost">
          12 Position
        </Badge>
        <Badge className={"text-orange-500 font-bold"} variant="ghost">
          Part Time
        </Badge>
        <Badge className={"text-green-500 font-bold"} variant="ghost">
          12 LPA
        </Badge>
      </div>
      <div className='flex items-center gap-4 mt-4'>
        <Button onClick={() => navigate(`/description/${jobId}`)} variant='outline'>Details</Button>
        <Button className='bg-blue-600'>Save For Later</Button>
      </div>
    </div>
  )
}

export default Job;