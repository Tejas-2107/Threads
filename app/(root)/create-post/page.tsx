import PostThread from '@/components/forms/PostThread';
import { fetchUserId } from "@/helper/fetchUserId";
import React from 'react'

const page = () => {
  const id=fetchUserId();
  return (
    <div className='w-full mt-14'>
      <PostThread  userId={id}/>
    </div>
  )
}

export default page
