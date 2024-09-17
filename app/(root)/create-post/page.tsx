import PostThread from '@/components/forms/PostThread';
import { fetchToken } from '@/helper/fetchToken'
import React from 'react'

const page = () => {
  const id=fetchToken();
  return (
    <div className='w-full mt-14'>
      <PostThread  userId={id}/>
    </div>
  )
}

export default page
