import React from 'react'

const addProduct = () => {
  return (
    <div className='newproduct w-4/5 mx-auto mt-16 flex flex-col items-center gap-y-9'>
      <div className='flex justify-between w-4/5 mx-auto items-center'>
        <input type="text" placeholder='title' name='title' />
        <select name="isAdmin" id="" className='bg-slate-300 border p-2' required>
          <option selected value="">Choose a category</option>
          <option value="kitchen">Kitchen</option>
          <option value="phone">Phone</option>
          <option value="computer">computer</option>
        </select>
      </div>
      <div className='flex justify-between w-4/5 mx-auto'>
        <input type="number" placeholder='Price' name='price' />
        <input type="number" placeholder='stock' name='stock' />
      </div>
      <div className='flex justify-between w-4/5 mx-auto'>
        <input type="text" placeholder='color' name='color' />
        <input type="text" placeholder='size' name='size' />
      </div>
      <div className='flex justify-between w-4/5 mx-auto justify-items-center'>
        <textarea name="address" rows={6} cols={50} className='border border-gray-800' placeholder='address'>
        </textarea>
      </div>
      <button type="submit" className='bg-green-700 w-full h-10 font-bold text-lg text-white'>Submit</button>
    </div>
  )
}

export default addProduct
