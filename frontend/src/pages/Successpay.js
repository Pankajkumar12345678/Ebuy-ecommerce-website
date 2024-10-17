import React from 'react'
import successImage from '../assest/success.gif'
import { Link } from 'react-router-dom';

const Successpay = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex flex-col justify-center items-center p-4 m-1 rounded-2xl'>
      <img src={successImage} alt={successImage} width={400} height={400} className='mix-blend-multiply' />
      <p className='text-green-600 font-bold text-xl'>Payment Successfully</p>
      <Link to={'/order'} className='p-2 px-3 mt-5 border-2 border-green-600 rounded-full font-semibold text-green-600 hover:bg-green-600 hover:text-white'>See Order</Link>
    </div>
  )
}

export default Successpay

