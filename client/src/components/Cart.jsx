import React from 'react'
import { FaStar } from "react-icons/fa";

const Cart = ({thumbnail , title , category , price , id}) => {
  return (
    <div className='max-w-sm w-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-300'>
        <img className='w-full  h-48 object-cover' src={thumbnail} alt="" />

        <div className='p-5 space-y-2'>
           <h2 className='text-lg font-semibold text-gray-900'>{title}</h2>
           <span className='px-2 py-0.5 bg-gray-100 rounded-full text-gray-700 capitalize'>{category}</span>


           <div className='flex justify-between text-sm text-gray-600 mt-5 px-[10px]'>
            <span className='font-semibold text-gray-800'>₹{price}</span>
            <span className='flex items-center gap-1'><FaStar size={22}  className='text-yellow-300'/>4</span>
           </div>
        </div>


    </div>
  )
}

export default Cart