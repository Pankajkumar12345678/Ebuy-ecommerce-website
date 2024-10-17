import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/displayCurrency'

// delete icons types
// import { MdDelete} from "react-icons/md"
// import { RiDeleteBack2Fill } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";

import {loadStripe} from '@stripe/stripe-js';


const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const context = useContext(Context);
    
    // Fallback for loadingCart in case context.cartProductCont is undefined
    const loadingCart = new Array(context?.cartProductCont || 4).fill(null);

    const fetchData = async () => {
        try {
            const response = await fetch(SummaryApi.addToCartProductView.url, {
                method: SummaryApi.addToCartProductView.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                }
            });
            const responseData = await response.json();

            if (responseData.success) {
                setData(responseData?.data);
            }

        } catch (error) {
            console.error("Error fetching cart data: ", error);
        }
    };

    const handleLoading = async() =>{
        await fetchData();
    }

    useEffect(() => {
        setLoading(true);
        handleLoading()
        setLoading(false);
    }, []);

    // console.log("product data: ", data);

// increase quantity
const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: 'include',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            _id: id,  // Include the product ID
            quantity: qty + 1
        })
    });

    const responseData = await response.json();

    if (responseData.success) {
        fetchData();
    }
};

// decrease quantity
const decreaseQty = async (id, qty) => {
    if (qty >= 2) {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                _id: id,  // Include the product ID
                quantity: qty - 1
            })
        });

        const responseData = await response.json();

        if (responseData.success) {
            fetchData();
        }
    }
};

const deleteCartProduct = async(id)=>{
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
        method: SummaryApi.deleteCartProduct.method,
        credentials: 'include',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            _id: id,  // Include the product ID
        })
    });

    const responseData = await response.json();

    if (responseData.success) {
        fetchData();
        context.fetchUserAddToCart()
    }
}

const totalQty = data.reduce((previousValue,currentValue)=>previousValue + currentValue?.quantity,0)
const totalPrice = data.reduce((previousValue,currentValue)=>previousValue + (currentValue?.quantity * currentValue?.productId?.sellingPrice),0)
const DiscountPrice = data.reduce((previousValue,currentValue)=>previousValue + (currentValue?.quantity * currentValue?.productId?.price),0)

// payment 
const handlePayment = async()=>{

    // const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    const stripePromise = await loadStripe('pk_test_51Q2yCLHprnVQCna5LWeNY74Lkl7hFDOXqMZPp6Vjy5mrhRkw7BNrOsRNgjo286sz3jFskGQn2IlbpDo7oULlQTkN00MbA2svnD');
    
    const response = await fetch(SummaryApi.payment.url,{
        method : SummaryApi.payment.method,
        credentials: 'include',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            cartItems : data
        })
    })

    const responseData = await response.json();
    if(responseData?.id){
        stripePromise.redirectToCheckout({
            sessionId : responseData?.id
        })
    }
    // console.log("payment responseData",responseData)
}

    return (
        <div className='container mx-auto'>
            <div className='text-center text-lg my-3'>
                {
                    data.length === 0 && !loading && (
                        <p className='bg-white py-5 rounded-md'>No Data Available</p>
                    )
                }
            </div>

            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                
                {/* View Product */}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingCart?.map((el, index) => (
                                <div key={el + "AddToCartLoading"+index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded-md'></div>
                            ))
                        ) : (
                            data?.map((product, index) => (
                                <div key={product?._id + "AddToCartProduct"} className='w-full bg-white h-32 my-2 border border-slate-300 rounded-md grid grid-cols-[128px,1fr]'>
                                    <div className='w-32 h-32 bg-slate-200 p-2 mix-blend-multiply'>
                                        {
                                        product?.productId?.productImage?.[0] &&(
                                            <img 
                                                src={product?.productId?.productImage[0]} 
                                                alt={product?.productId?.productImage[0]} 
                                                className='w-full h-full object-scale-down mix-blend-multiply' 
                                            />
                                        )
                                        }
                                    </div>

                                    <div className='px-4 py-2 relative'>
                                        
                                        {/* delete product */}
                                        <div className='absolute right-0 text-red-600 rounded-full p-1 hover:bg-red-600 hover:text-white cursor-pointer mr-1 text-3xl' onClick={()=>deleteCartProduct(product?._id)}> {/*update p-2 to p-1 */}
                                            {/* <MdDelete/> */}
                                            {/* <RiDeleteBack2Fill/> */}
                                            <TiDelete/>
                                        </div>

                                        <h2 className='text-lg lg:text-2xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                                        <div className='flex items-center justify-between'>
                                            <p className='text-green-600 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                            <p className='text-slate-600 font-semibold text-lg line-through'>{displayINRCurrency(product?.productId?.price * product?.quantity)}</p>
                                        </div>
                                        <div className='flex items-center gap-3 mt-1'>
                                            <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-sm w-6 h-6 flex justify-center items-center'onClick={()=>decreaseQty(product?._id,product?.quantity)}>-</button>
                                            <span>{product?.quantity}</span>
                                            <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-sm w-6 h-6 flex justify-center items-center' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>

                {/* Total product & Summary  */}
                
                {/** updated the code then set this feature user login then show product Summary OtherWise Not Show*/}
                {
                data.length !== 0 && !loading && (
                    <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                    {
                        loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse rounded-md'>
                                Loading total...
                            </div>
                        ) : (
                            <div className='h-fit overflow-hidden bg-white rounded-md'>
                                <h2 className='text-white bg-slate-600 capitalize px-4 py-1 font-bold text-lg'>Price details</h2>
                                <div className='flex items-center justify-between px-4 py-2 gap-2 font-medium text-lg text-slate-600'>
                                    <p>Quantity</p>
                                    <p>{totalQty}</p>
                                </div>
                                <div className='flex items-center justify-between px-4 py-2 gap-2 font-medium text-lg text-slate-600'>
                                    <p>Total Price</p>
                                    <p>{displayINRCurrency(DiscountPrice)}</p>
                                </div>
                                <div className='flex items-center justify-between px-4 py-2 gap-2 font-medium text-lg text-slate-600'>
                                    <p>Discount Price</p>
                                    <p className='text-green-400'>-{displayINRCurrency(DiscountPrice-totalPrice)}</p>
                                </div>
                                <div className='flex items-center justify-between px-4 py-2 gap-2 font-semibold text-lg text-slate-600'>
                                    <p>Delivery Charges</p>
                                    <p className='line-through text-green-400'>{displayINRCurrency(40)} Free</p>
                                </div>
                                <div className='flex items-center justify-between px-4 py-2 gap-2 font-medium text-lg text-slate-600'>
                                    <p>Total Amount</p>
                                    <p>{displayINRCurrency(totalPrice)}</p>
                                </div>
                                
                                <button className='custome-bg-orange-buy p-2 text-white w-full rounded-lg' onClick={handlePayment}>Payment</button>
                            </div>
                        )
                    }
                    </div>
                )
                }
            </div>
        </div>
    );
}

export default Cart;
