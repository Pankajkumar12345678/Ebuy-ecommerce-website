import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import shopping from '../assest/shopping-cart.png'
import { Link } from 'react-router-dom';

const CategoryList = () => {

    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const categoryLoading= new Array(categoryProduct.length).fill(null) //13

    const fetchCategoryProduct = async () => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.categoryProduct.url, {
                method: SummaryApi.categoryProduct.method,
            });

            const dataResponse = await response.json();
            // console.log("dataResponse frontend", dataResponse);
            
            // Check if dataResponse contains a data field with an array
            if (dataResponse.success) {  // && Array.isArray(dataResponse.data) is optional adding then check data is array or not
                setCategoryProduct(dataResponse.data);
            } 
            else {
                console.error('Unexpected data structure:', dataResponse);
                setCategoryProduct([]); // Set as empty array if not valid
            }

        } catch (error) {
            console.error('Failed to fetch category products', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoryProduct();
    }, []);

    // console.log("categoryProduct", categoryProduct); this is use for testing purpose

    return (
        <div className='container mx-auto p-4'>
            <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none '> 
                {
                loading?(
                    categoryLoading.map((el,index)=>{
                            return(
                                <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading"+index}>

                                </div>
                            ) 
                        })
                ):(
                    categoryProduct.length > 0 &&(
                        categoryProduct.map((product, index) => {
                        return(
                            <Link to={"/product-category?category="+product?.category} className='cursor-pointer' key={product?.category}>
                                <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                    <img 
                                        src={product?.productImage[0] || shopping} 
                                        alt={product?.category || 'Category'} 
                                        className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all ' 
                                    />
                                </div>
                                <p className=' text-center text-sm md:text-base capitalize'>{product?.category}</p>
                            </Link>
                            
                            )
                        })
                    ) 
                )
                }
            </div>
        </div>
    );
};

export default CategoryList;
