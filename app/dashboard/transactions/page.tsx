import React from 'react'

const TransactionPage = () => {
  return (
    <div className='w-full mt-5'>
      <table className='table w-4/5 mx-auto border py-8'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        
        <br />
        <tbody className='text-center my-8'>
          <tr>
            <td>John Doe</td> 
            <td>Completed</td>
            <td>12/12/2019</td>
            <td>$100</td>
          </tr>
          <br />
          <tr>
            <td>John Doe</td> 
            <td>Completed</td>
            <td>12/12/2019</td>
            <td>$100</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TransactionPage