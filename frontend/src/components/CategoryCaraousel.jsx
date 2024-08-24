

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'

const category = [
    "Web Development",
    "Mobile Development",
    "Machine Learning",
    "Data Science",
    "Artificial Intelligence",
    "Blockchain",
    "Cyber Security",
    "Cloud Computing",
    "DevOps",
]
const CategoryCaraousel = () => {
  return (
    <div>
       <Carousel className='w-full max-w-xl mx-auto my-20'>
        <CarouselContent>
            {
            category.map((cat, index) => (
                <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3'>
                    <Button variant='outline' className='rounded-full'>{cat}</Button>
                </CarouselItem>
            ))
            }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
       </Carousel>
    </div>
  )
}

export default CategoryCaraousel