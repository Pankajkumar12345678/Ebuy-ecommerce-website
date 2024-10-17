import React, { useState } from 'react'
import {CgClose} from 'react-icons/cg';
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt} from 'react-icons/fa';
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import {MdDelete} from 'react-icons/md';
import SummaryApi from '../common';
import {toast} from 'react-toastify';

const UploadProduct = ({
    onClose,
    fetchData
}) => {

    const [data,setData]= useState({
        productName:"",
        brandName:"",
        category:"",
        productImage:[],
        description:"",
        price:"",
        sellingPrice:""
    })

    const [openFullScreenImage,setOpenFullScreenImage]= useState(false)

    const [fullScreenImage,setFullScreenImage] = useState("")

    const handleOnChange = (e)=>{
        const {name, value} =e.target

        setData((prev)=>{
            return{
                ...prev,
               [name]:value
            }
        })
    }

    const handleUploadProduct=async(e)=>{
        const file = e.target.files[0]
        // console.log("file",file) //show the file name

        const uploadImageCloudinary = await uploadImage(file)
        setData((prev)=>{
            return{
                ...prev,
                productImage:[...prev.productImage,uploadImageCloudinary.url]
            }
        })
        // access the url cloudnary store image
        // console.log("upload Image",uploadImageCloudinary.url)
    }

    // delete product image handle
    const handleDeleteProductImage = async(index)=>{
        console.log("Image index",index)

        const newProductImage =[...data.productImage]
        newProductImage.splice(index,1)

        setData((prev)=>{
            return{
                ...prev,
                productImage:[...newProductImage]
            }
        })
    }

    // upload product button handle the upload product

    const handleSubmit=async(e)=>{
        e.preventDefault()
        // console.log("data",data)  // all data print in console

        const response = await fetch(SummaryApi.uploadProduct.url,{
            method:SummaryApi.uploadProduct.method,
            credentials:'include',
            headers:{
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const responseData = await response.json()

        if(responseData.success){
            toast.success(responseData?.message)
            onClose()
            fetchData()
        }

        if(responseData.error){
            toast.error(responseData?.message)
            onClose()
        }
    }

return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-40 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
        <div className='bg-white p-4 rounded-xl w-full max-w-xl h-full max-h-[80%] overflow-hidden'>

            <div className='flex justify-between items-center pb-3'>
                <h2 className='font-bold text-lg'>Upload Product</h2>
                <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                    <CgClose/>
                </div>
            </div>

            <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-9' onSubmit={handleSubmit}>
                <label htmlFor='productName'>Product Name :</label>
                <input 
                    type='text'
                    id='productName'
                    placeholder='Enter Product Name'
                    name='productName'
                    value={data.productName}
                    onChange={handleOnChange}
                    className='p-2 bg-slate-100 border rounded-lg'
                    required
                />

                <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
                <input 
                    type='text'
                    id='brandName'
                    placeholder='Enter Brand Name'
                    name='brandName'
                    value={data.brandName}
                    onChange={handleOnChange}
                    className='p-2 bg-slate-100 border rounded-lg'
                    required
                />

                <label htmlFor='category' className='mt-3'>Category :</label>
                <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded-lg'>
                    <option value={""}>Select Category</option>
                    {
                        productCategory.map((el,index)=>{
                            return(
                                <option value={el.value} key={el.value+index}>{el.label}</option>
                            )
                        })
                    }
                </select>

                <label htmlFor='productImage' className='mt-3'>Product Image :</label>
                <label htmlFor='uploadImageInput'>
                    <div className='p-2 bg-slate-100 border rounded-lg h-32 w-full flex justify-center items-center cursor-pointer'>
                        <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                            <span className='text-4xl'><FaCloudUploadAlt/></span>
                            <p className='text-sm'>Upload Product Image</p>
                            <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} required/>
                        </div>
                    </div>
                </label>
                <div>
                    {
                        data?.productImage[0]? (
                            <div className='flex items-center gap-2'>
                                {
                                    data?.productImage.map((el,index)=>{
                                        return(
                                            <div className='relative group'>
                                                <img
                                                    src={el}
                                                    alt={el}
                                                    width={80}
                                                    height={80}
                                                    className='bg-slate-100 border cursor-pointer'
                                                    onClick={()=>{
                                                        setOpenFullScreenImage(true)
                                                        setFullScreenImage(el)
                                                }}/>
                                                <div className='absolute bottom-0 right-0 p-1 cursor-pointer text-white bg-red-600 rounded-full hidden group-hover:block' onClick={()=>handleDeleteProductImage(index)}>
                                                    <MdDelete/>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ):(
                            <p className='text-red-600 text-xs'>*Please Upload Product Image</p>
                        )
                    }
                </div>
                
                <label htmlFor='price' className='mt-3'>Price :</label>
                <input 
                    type='number'
                    id='price'
                    placeholder='Enter Price'
                    name='price'
                    value={data.price}
                    onChange={handleOnChange}
                    className='p-2 bg-slate-100 border rounded-lg'
                    required
                />


                <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
                <input 
                    type='number'
                    id='sellingPrice'
                    placeholder='Enter Selling Price'
                    name='sellingPrice'
                    value={data.sellingPrice}
                    onChange={handleOnChange}
                    className='p-2 bg-slate-100 border rounded-lg'
                    required
                />

                
                <label htmlFor='description' className='mt-3'>Description :</label>
                <textarea 
                    className='p-2 h-28 bg-slate-100 border rounded-lg resize-none ' 
                    rows={3} 
                    placeholder='Enter Product Description ' 
                    onChange={handleOnChange}
                    name='description'
                    value={data.description}
                >

                </textarea>
                
                <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700 rounded-2xl'>Upload Product</button>
                

            
            </form>
        </div>


        {/* Display Image full screen */}
        {
            openFullScreenImage && (
                <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
            )
        }
    </div>
  )
}

export default UploadProduct


//7:06 dekh chuka hai essa aage dekhna baki hai
