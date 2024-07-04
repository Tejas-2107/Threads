'use client'
import React, { useState } from 'react'
import { User } from '@/types/interfaces'

const AddUser = () => {
  const [userData, setUserData] = useState<User>({
    username: "",
    email: "",
    password: "",
    phone: "",
    isAdmin: undefined,
    isActive: undefined,
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  }

  const handleSubmit = async () => {
    const { username, email, password, phone, address,isActive, isAdmin } = userData;

    if (username && email && password && phone && address && isAdmin && isActive) {
      try {
        const res = await fetch("/api/user", {
          method: "post",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
        alert("data uploaded succefully");
        setUserData({
          username: "",
          email: "",
          password: "",
          phone: "",
          isAdmin: undefined,
          isActive: undefined,
          address: "",
        });
      } catch (error) {
        alert(error);
      }
    } else {
      alert("All fields are required")
    }
  }

  return (
    <div className='newuser w-4/5 mx-auto mt-16 flex flex-col items-center gap-y-9'>
      <div className='flex justify-between w-4/5 mx-auto'>
        <input type="text" placeholder='Username' name='username' onChange={handleChange} value={userData.username} />
        <input type="email" placeholder='Email' name='email' onChange={handleChange} value={userData.email} />
      </div>
      <div className='flex justify-between w-4/5 mx-auto'>
        <input type="password" placeholder='Password' name='password' onChange={handleChange} value={userData.password} />
        <input type="number" placeholder='Phone Number' name='phone' required minLength={10} maxLength={10} onChange={handleChange} value={userData.phone} />
      </div>
      <div className='flex justify-between w-4/5 mx-auto'>
        <select name="isAdmin" id="" className='bg-slate-300 border p-2' required onChange={handleChange}>
          <option selected={userData.isAdmin === undefined ? true : false} value="">Are you an admin?</option>
          <option value="true">yes</option>
          <option value="false">No</option>
        </select>
        <select name="isActive" className='bg-slate-300 border p-2' required onChange={handleChange} >
          <option selected={userData.isActive === undefined ? true : false} value="">Is active?</option>
          <option value="true">yes</option>
          <option value="false">No</option>
        </select></div>
      <textarea name="address" rows={6} cols={50} className='border border-gray-800' placeholder='address' onChange={handleChange} value={userData.address}>
      </textarea>
      <button type="submit" className='bg-green-700 w-full h-10 font-bold text-lg text-white' onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default AddUser
