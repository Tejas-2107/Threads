import { UserResponse } from '@/types/interfaces';
import Link from 'next/link'
import React from 'react'

 

const UserPage = async() => {
  const res = await fetch("http://localhost:3000/api/user");
  const data:UserResponse[]= await res.json();
  return (
    <div className='w-full mt-5 flex flex-col items-center'>
      <table className='table w-4/5 mx-auto border py-8'>
        <thead className='bg-slate-300'>
          <tr>
            <th className='py-3 px-3'>Name</th>
            <th className='py-3 px-3'>Email</th>
            <th className='py-3 px-3'>Created At</th>
            <th className='py-3 px-3'>Status</th>
            <th className='py-3 px-3'>Role</th>
            <th className='py-3 px-3'>Action</th>
          </tr>
        </thead>
        <tbody className='text-center my-8'>
          {data?.length === 0 ? "Loading" : data.map((user: UserResponse) => {
            return <>
              <tr key={user._id} className='border-b-2'>
                <td className='py-4'>{user.username}</td>
                <td className='py-4'>{user.email}</td>
                <td className='py-4'>{user.date}</td>
                <td className='py-4'>{user.isAdmin}</td>
                <td className='py-4'>x</td>
                <td className='py-4'>
                  <button className='bg-green-400 mr-5 w-12 rounded-md font-medium'>View</button>
                  <button className='bg-red-600 ml-5 w-14 rounded-md font-medium'>Delete</button>
                </td>
              </tr>
            </>
          })}
        </tbody>
      </table>
      <button className='bg-blue-400 mt-5 p-2 rounded-md font-medium'><Link href='users/newUser'>Add New User</Link></button>
    </div>
  )
}

export default UserPage