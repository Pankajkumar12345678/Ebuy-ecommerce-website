import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import scrollTop from '../helpers/scrollTop'
import displayINRCurrency from '../helpers/displayCurrency'
import Context from '../context'
import addToCart from '../helpers/addToCart'

const VerticalCard = ({loading,data=[]}) => {
    const loadingList = new Array(13).fill(null)
    const {fetchUserAddToCart} = useContext(Context)

    // add to cart handle
    const handleAddToCart=async(e,id)=>{
        await addToCart(e,id)
        fetchUserAddToCart()
    }

return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-evenly gap-6 md:gap-4 overflow-x-scroll scrollbar-none rounded-lg transition-all'>
        
        {
            loading?(
                loadingList.map((product,index)=>{
                    return(
                        <div className='w-full min-w-[300px] md:min-w-[320px] max-w-[300px] md:max-w-[320px] bg-white rounded-lg shadow overflow-hidden'> {/* update (mobile version) max-w-[280px] to max-w-[300px] and min-w-[280px] to min-w-[300px] and h-36 to h-40 */}
                            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                            </div>
                            <div className='p-4 grid gap-3'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1  text-black p-2 animate-pulse rounded-full bg-slate-200'><p></p></h2>
                                <p className='capitalize text-slate-500 p-2 animate-pulse rounded-full bg-slate-200'></p>
                                <div className='pb-1'>
                                    <h2 className='font-sm text-green-600 p-2 mb-2 animate-pulse rounded-full bg-slate-200'><p></p></h2>
                                    <div className='flex gap-3 w-full'>
                                        <p className='font-medium text-red-600 p-2 animate-pulse rounded-full bg-slate-200 w-full'></p>
                                        <p className='font-semibold text-slate-500 line-through p-2 animate-pulse rounded-full bg-slate-200 w-full'></p>
                                    </div>
                                </div>
                                <button className='text-sm text-white px-3 py-3 rounded-full animate-pulse  bg-slate-200'></button>
                            </div>
                        </div>
                    )
                })
    
        ):(
            data.map((product,index)=>{
                return(
                    <Link to={"/product/"+product?._id} className='w-full min-w-[300px] md:min-w-[300px] max-w-[300px] md:max-w-[300px] bg-white rounded-lg shadow overflow-hidden' onClick={scrollTop}> {/* update (mobile version) max-w-[280px] to max-w-[300px] and min-w-[280px] to min-w-[300px] and h-36 to h-40 */}
                        <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                            <img src={product?.productImage[0]} alt={product?.productName} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
                        </div>
                        <div className='p-4 grid gap-3'>
                            <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1  text-black'>{product?.productName}</h2>
                            <p className='capitalize text-slate-500'>{product?.category}</p>
                            <div className='pb-1'>
                                <h2 className='font-sm text-green-600'>Special price</h2>
                                <div className='flex gap-3'>
                                    <p className='font-medium text-red-600'> 
                                        {
                                            displayINRCurrency(product?.sellingPrice)
                                        }
                                    </p>
                                    <p className='font-semibold text-slate-500 line-through'>
                                            {
                                            displayINRCurrency(product?.price)
                                            }
                                    </p>
                                </div>
                            </div>
                            <button className='text-sm custome-bg-orange hover:bg-orange-500 text-white px-3 py-2 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                        </div>
                    </Link>
                )
            })
        )
        }
        </div>
)
}

export default VerticalCard
