import React from 'react'
import { Input } from "@/components/ui/input"
import { cn } from '@/lib/utils';
import {voiceDetails} from '@/constants/index'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const CreatePodcast = () => {
  return (
    <div className='w-full'>
      <section className='w-3/5 mx-auto'>
        <h1 className='my-10 font-bold text-xl text-center'>Create Podcast</h1>
        <form className='flex flex-col gap-y-6'>
          <Input type="text" name='title' placeholder="Enter a title" className={cn(
            "bg-black-1 focus-visible:ring-offset-orange-1",
          )} />
          <Input type="textarea" name='description' placeholder="Enter a description" className={cn(
            "bg-black-1 focus-visible:ring-offset-orange-1 h-20",
          )} />
          <Select required>
            <SelectTrigger className="bg-black-1">
              <SelectValue placeholder="Choose AI Voice" />
            </SelectTrigger>
            <SelectContent>
              {voiceDetails.map(({id,name})=>(
                <SelectItem value={name} key={id}>{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

        </form>
      </section>
    </div>
  )
}

export default CreatePodcast;