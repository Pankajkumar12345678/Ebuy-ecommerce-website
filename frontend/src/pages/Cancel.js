import React from 'react'
import cancelImage from '../assest/cancel.gif'
import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex flex-col justify-center items-center p-4 m-1 rounded-2xl'>
      <img src={cancelImage} alt="Cancel" className='rounded-full w-72 h-72 object-cover'/>
      <p className='text-red-600 font-bold text-xl mt-4'>Payment Cancel</p>
      <Link to={'/cart'} className='p-2 px-3 mt-5 border-2 border-red-600 rounded-full font-semibold text-red-600 hover:bg-red-600 hover:text-white'>Go To Cart</Link>
    </div>
  )
}

export default Cancel
