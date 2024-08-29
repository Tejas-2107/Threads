import React from 'react'
import Image from 'next/image'
const PodcastCard = ({id,title,description,imgURL}:{id:number,title:string,description:string,imgURL:string}) => {
  return (
    <div className='cursor-pointer'>
        <figure className='flex flex-col gap-2'>
            <Image 
            src={imgURL} 
            alt='title'
            width={174}
            height={174}
            className='aspect-square h-fit rounded-xl'
            />
            <div className="flex flex-col">
          <h1 className="text-16 font-bold truncate">{title}</h1>
          <h2 className='text-12 text-gray-1 font-normal truncate'>{description}</h2>
        </div>
        </figure>
    </div>
  )
}

export default PodcastCard