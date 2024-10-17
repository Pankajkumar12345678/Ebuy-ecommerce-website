import React, { useState } from 'react'
import { MdModeEditOutline } from 'react-icons/md'
import AdminEditProduct from './AdminEditProduct'
import displayINRCurrency from '../helpers/displayCurrency'
const AdminProductCard = ({
    data,
    fetchdata
}) => {

    const [editProduct,setEditProduct]= useState(false)

return (
        <div className='bg-white p-4 rounded-2xl shadow-lg relative'>
            <div className='w-40'>                            {/* additional add  span tag in price and selling price and displayInrCurrency  */} 
                <div className='w-full h-32 justify-center items-center'>{/*  w-32 then update  w-full  */} 
                    <img src={data?.productImage[0]} width={120} height={120} alt='product' className='mx-auto object-fill h-full'/>
                </div>
                <h1 className='text-ellipsis line-clamp-2'>{data?.productName}</h1>
                
                <div>
                <h2 className='font-semibold pt-1 text-green-600'>Special price</h2>
                <div className='flex gap-2'>
                    <p className='font-semibold'>
                        <span className='line-through'>
                            {
                                displayINRCurrency(data.price)
                            }
                        </span>
                    </p>
                    <p className='font-semibold'>
                        <span className='text-green-500'>
                            {
                                displayINRCurrency(data.sellingPrice)
                            }
                        </span>
                    </p>
                </div>
                    <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer absolute bottom-0 right-0 mb-2 mr-2 ' onClick={()=>setEditProduct(true)} >
                        <MdModeEditOutline/>
                    </div>
                </div>
                
            </div>

            {
                editProduct &&(
                    <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchdata={fetchdata}/>
                )
            }

        </div>
    
)
}

export default AdminProductCard
