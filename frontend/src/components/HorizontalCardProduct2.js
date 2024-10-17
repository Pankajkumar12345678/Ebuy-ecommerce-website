import React, { useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'

const HorizontalCardProduct2 = ({category,heading}) => {
    const [data,setData]=useState([])
    const [loading,setLoading] = useState(false)

    const loadingList = new Array(13).fill(null)

    const [scroll,setScroll]=useState(0)
    const [scrollDirection, setScrollDirection] = useState('right'); // Track scroll direction
    const scrollElement = useRef();
    const itemWidth = 310; // Width of one item in pixels

    
    const fetchData =async()=>{
        setLoading(true)
        const categoryProduct=await fetchCategoryWiseProduct(category)
        setLoading(false)
        console.log("horizontal data",categoryProduct?.data)
        setData(categoryProduct?.data || [])
    }

    useEffect(()=>{
        fetchData()
    },[])

    // scrolling feature 
    const scrollRight = () => {
        scrollElement.current.scrollBy({
            left: itemWidth,
            behavior: 'smooth'
        });
    };

    const scrollLeft = () => {
        scrollElement.current.scrollBy({
            left: -itemWidth,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        const container = scrollElement.current;

        const handleAutoScroll = () => {
            const maxScrollLeft = container.scrollWidth - container.clientWidth;

            // Check the scroll direction and adjust accordingly
            if (scrollDirection === 'right') {
                // If reached the end, change direction to left
                if (container.scrollLeft + itemWidth >= maxScrollLeft) {
                    setScrollDirection('left');
                } else {
                    container.scrollBy({
                        left: itemWidth,
                        behavior: 'smooth',
                    });
                }
            } else {
                // If reached the start, change direction to right
                if (container.scrollLeft <= 0) {
                    setScrollDirection('right');
                } else {
                    container.scrollBy({
                        left: -itemWidth,
                        behavior: 'smooth',
                    });
                }
            }
        };
        // Set interval for auto-scrolling
        const autoScroll = setInterval(handleAutoScroll, 3000); // Scroll every 3 seconds

        return () => clearInterval(autoScroll); // Cleanup interval on unmount
    }, [scrollDirection]);

return (
    <div className='container mx-auto px-4 my-6 relative'>
        <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
        <div className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none rounded-lg transition-all' ref={scrollElement} style={{ scrollBehavior: 'smooth' }}>
        <button onClick={scrollLeft} className='bg-white shadow-md rounded-full p-1 hover:bg-gray-100 absolute left-0 text-lg hidden md:block'>
            <FaAngleLeft/>
        </button>
        <button onClick={scrollRight} className='bg-white shadow-md rounded-full p-1 hover:bg-gray-100 absolute right-0 text-lg hidden md:block'>
            <FaAngleRight/> 
        </button>
        {
            data.map((product,index)=>{
                
                return(
                    <div className='w-full min-w-[300px] md:min-w-[320px] max-w-[300px] md:max-w-[320px] h-40 bg-white rounded-lg shadow flex overflow-hidden'> {/* update (mobile version) max-w-[280px] to max-w-[300px] and min-w-[280px] to min-w-[300px] and h-36 to h-40 */}
                        <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                            <img src={product?.productImage[0]} alt={product?.productName} className='object-scale-down h-full hover:scale-110 transition-all'/>
                        </div>
                        <div className='p-4 grid'>
                            <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
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
                            <button className='text-sm custome-bg-orange hover:bg-orange-500 text-white px-3 py-1 rounded-full'>Add to Cart</button>
                        </div>
                    </div>
                )
            })
        }
        </div>
    </div>
    )
}

export default HorizontalCardProduct2
