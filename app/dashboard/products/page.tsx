import Link from 'next/link'
import React from 'react'

const ProductPage = () => {
  return (
    <div className='w-full mt-5 flex flex-col items-center'>
      <table className='table w-4/5 mx-auto border py-8'>
        <thead className='bg-slate-300'>
          <tr>
            <th className='py-3 px-3'>Titke</th>
            <th className='py-3 px-3'>Description</th>
            <th className='py-3 px-3'>Price</th>
            <th className='py-3 px-3'>Created At</th>
            <th className='py-3 px-3'>Stock</th>
            <th className='py-3 px-3'>Action</th>
          </tr>
        </thead>
        <tbody className='text-center my-8'>
          <tr className='border-b-2'>
            <td className='py-4'>John Doe</td>
            <td className='py-4'>Completed</td>
            <td className='py-4'>12/12/2019</td>
            <td className='py-4'>$100</td>
            <td className='py-4'>x</td>
            <td className='py-4'>
              <button className='bg-green-400 mr-5 w-12 rounded-md font-medium'>View</button>
              <button className='bg-red-600 ml-5 w-14 rounded-md font-medium'>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button className='bg-blue-400 mt-5 p-2 rounded-md font-medium'><Link href='products/newProduct'>Add New Product</Link></button>
    </div>
  )
}

export default ProductPage