import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'


const filterData = [
  {
    filterType: 'Location',
    array:["Delhi NCR", "Banglore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: 'Industry',
    array:["Frontend Developer", "Backend Development", "Full stack Development" ]
  },
  {
    filterType: 'Salary',
    array:["0-40K ", "42-1Lakh", "1Lakh to 5Lakh"]
  },
]

const FilterCard = () => {
  return (
    <div className='w-full bg-white p-3 rounded-md'>
        <h1> Filter Jobs</h1>
        <hr className='mt-3'/>
        <RadioGroup>
          {
            filterData.map((data, index) => (
              <div key={index}>
                <h1 className='font-bold text-lg'>{data.filterType}</h1>
                {
                  data.array.map((item, index) => {
                   return (
                     <div key={index} className='flex items-center space-x-2 my-2'> 
                      <RadioGroupItem value={item}/>
                      <Label>{item}</Label>
                      </div>
                   )
                  }
                   // update some points
                  )
                }
              </div>
            ))
          }
        </RadioGroup>
    </div>
  )
}

export default FilterCard