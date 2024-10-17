import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import displayINRCurrency from '../helpers/displayCurrency'

const AllOrder = () => {
    const [data,setData] = useState([])

    const fetchOrderDetails = async()=>{
        const response= await fetch(SummaryApi.allOrder.url,{
            method : SummaryApi.allOrder.method,
            credentials :"include"
        })

        const responseData = await response.json()
        setData(responseData?.data)
        
        console.log("Order List",responseData)
    }
    useEffect(()=>{
        fetchOrderDetails()
    },[])
return (
<div>
    <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Orders : {data?.length}</h2>
    </div>

    <div className='h-[calc(100vh-130px)] overflow-y-scroll'>
        <div className='text-center text-lg my-3'>
            {
                data.length === 0 && (
                    <p className='bg-white py-5 rounded-md'>No Order Available</p>
                )
            }
        </div>

        <div className='px-4 w-full'> {/* update p-4 to px-4 */}
            {
                data?.map((item,index)=>{
                    return(
                        <div key={item?.userId+index}>
                            <p className='font-bold text-lg text-rose-500'>{moment(item?.createdAt).format('LL')}</p>
                            <div className='border rounded-lg p-2 shadow-sm hover:shadow-md'>
                                <div className='flex flex-col md:flex-row justify-between'>
                                    {/* product Details */}
                                    <div className='grid gap-1'>
                                    {
                                        item?.productDetails?.map((product,index)=>{
                                            return(
                                                <div key={product?.productId+index} className='flex gap-3 bg-slate-100 rounded-lg' >
                                                    <img src={product?.image[0]} alt='' className='w-28 h-28 bg-slate-200 object-scale-down p-2 rounded-lg mix-blend-multiply' />

                                                    <div>
                                                        <div className='font-medium text-lg text-ellipsis line-clamp-1'>{product?.name}</div>
                                                        <div className='flex items-center gap-5 mt-1'>
                                                            <p className='text-lg font-semibold text-green-500'>{displayINRCurrency(product?.price)}</p>
                                                            <p className='text-lg font-semibold'>Quantity : {product?.quantity}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }  
                                    </div>

                                    <div className='flex flex-col gap-4 p-2 min-w-[250px]'> {/*min-w-[300px] update min-w-[250px] */}
                                        {/* Payment Details */}
                                        <div>
                                            <div className='text-lg font-medium'>Payment Details : </div>
                                            <p className='text-lg ml-1'>Payment Method : <span className='text-green-600 capitalize font-medium'>{item?.paymentDetails?.payment_method_type[0]}</span></p>
                                            <p className='text-lg ml-1'>Payment Status : <span className='text-green-600 capitalize font-medium'>{item?.paymentDetails?.payment_status}</span></p>
                                        </div>

                                        <div>
                                            {/* Shipping Details */}
                                            <div className='text-lg font-medium'>Shipping Details : </div>
                                            {
                                                item?.shipping_options.map((shipping,index)=>{
                                                    return(
                                                        <div key={shipping?.shipping_rate+index} className='text-lg ml-1'>
                                                            Shipping Amount : <span className='text-green-600 font-medium'>{displayINRCurrency(shipping?.shipping_amount)}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                
                                <div className='flex flex-col md:flex-row justify-between items-center pt-2'> 
                                    <div className='font-bold md:text-lg w-fit pb-1 text-fuchsia-600'>      {/*add the user email id in the order card */}
                                        User Email : <span className='text-indigo-600'>{item?.email}</span>
                                    </div>
                                    <div className='font-bold md:text-lg ml-auto w-fit pr-3 pb-1 text-orange-500'>
                                        Total Amount : <span className='text-rose-600'>{displayINRCurrency(item?.totalAmount)}</span>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
</div>
)
}

export default AllOrder
