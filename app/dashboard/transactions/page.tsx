import React from 'react'

const TransactionPage = () => {
  return (
    <div className='w-full mt-5'>
      <table className='table w-4/5 mx-auto border py-8'>
        <thead className='bg-slate-300'>
          <tr>
            <th className='py-3 px-3'>Status</th>
            <th className='py-3 px-3'>Date</th>
            <th className='py-3 px-3'>Amount</th>
            <th className='py-3 px-3'>Name</th>
          </tr>
        </thead>
        <tbody className='text-center my-8'>
          <tr className='border-b-2'>
            <td className='py-4'>John Doe</td> 
            <td className='py-4'>Completed</td>
            <td className='py-4'>12/12/2019</td>
            <td className='py-4'>$100</td>
          </tr>
          <tr className='border-b-slate-600'>
            <td className='py-4'>John Doe</td> 
            <td className='py-4'>Completed</td>
            <td className='py-4'>12/12/2019</td>
            <td className='py-4'>$100</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TransactionPage