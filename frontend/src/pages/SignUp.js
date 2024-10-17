import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common/index';
import { toast } from 'react-toastify';

const SignUp = () => {

    const [showPassword,setShowPassword]=useState(false);
    const [showConfiremPassword, setShowConfiremPassword]=useState(false);
    const [data,setData]=useState({
        email:"",
        password:"",
        name:"",
        confirmPassword:"",
        profilePic:"",
    })

    const navigate=useNavigate()

    const handleOnChange=(e)=>{
        const {name,value}=e.target

        setData((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
    }

    // method 1 without try catch using
    // profile pic handle
    // const handleUploadPic = async(e)=>{
    //     const file = e.target.files[0]
    //     const imagePic=await imageTobase64(file)
    //     // console.log("imagePic",imagePic);

    //     setData((prev)=>{
    //         return{
    //             ...prev,
    //             profilePic:imagePic
    //         }
    //     });
        
    // }

    // method 2 using try catch method
    // profile pic handle
    const handleUploadPic = async (e) => {
        const file = e.target.files[0];
    
        try {
            const imagePic = await imageTobase64(file);
            // console.log("imagePic",imagePic);

            setData((prev) => ({
                ...prev,
                profilePic: imagePic,
            }));
        } catch (error) {
            toast.error(error.message || "Error processing image");
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(data.password===data.confirmPassword){
            try {
                const response = await fetch(SummaryApi.signUP.url, {
                    method: SummaryApi.signUP.method,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                const responseData = await response.json();
                
                if(responseData.success){
                    toast.success(responseData.message)
                    navigate("/login")
                }
                
                if(responseData.error){
                    toast.error(responseData.message)
                }
                // toast(responseData.message)
                console.log("data", responseData);
            } 
            catch (error) {
                console.error("Error during sign-up:", error);
            }
        }
        else{
            console.log("Please check Password and confirm Password");  
            toast.error("Please check Password and confirm Password") 
        }
    };
//console.log(data); //this console is use to check signup data in console

return (
    <section id='signup'>
    <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto shadow-xl rounded-2xl custom-background'>
            
            <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                <div>
                    <img src={data.profilePic || "https://cdn.pixabay.com/animation/2022/12/05/10/47/10-47-58-930_512.gif" || loginIcons} alt='login icons' /> {/* className='rounded-full' */}
                </div>
                <form>
                    <label>
                        <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                            Upload Photo
                        </div>
                        <input type='file' className='hidden' onChange={handleUploadPic} />
                    </label>
                </form>
            </div>

            <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                <div className='grid'>
                    <label className='text-lg font-bold text-gray-800 '>Name : </label>
                    <div className='bg-slate-200 bg-transparent border rounded-md p-2 text-lg focus-within:shadow-md'>
                        <input 
                            type='text' 
                            placeholder='Enter Your Name' 
                            name='name'
                            value={data.name}
                            onChange={handleOnChange}
                            required
                            className='w-full h-full outline-none bg-transparent' />
                    </div>
                </div>

                <div className='grid'>
                    <label className='text-lg font-bold text-gray-800 '>Email : </label>
                    <div className='bg-slate-200 bg-transparent border rounded-md p-2 text-lg focus-within:shadow-md'>
                        <input 
                            type='email' 
                            placeholder='Enter Email' 
                            name='email'
                            value={data.email}
                            onChange={handleOnChange}
                            required
                            className='w-full h-full outline-none bg-transparent' />
                    </div>
                </div>

                <div>
                    <label className='text-lg font-bold text-gray-800 my-2'>Password : </label>
                    <div className='flex bg-slate-200 bg-transparent border rounded-md p-2 text-lg focus-within:shadow-md'>
                        <input 
                            type={showPassword ?
                            "text":"password"} 
                            placeholder='Enter Password'
                            value={data.password} 
                            name='password'
                            onChange={handleOnChange}
                            required
                            className='w-full h-full outline-none bg-transparent' />
                        <div className='cursor-pointer text-xl'onClick={()=>setShowPassword((prev)=>!prev)} >
                            <span>
                            {
                            showPassword ?(<FaEyeSlash/>):(<FaEye/>)  
                            }   
                            </span>
                        </div>
                    </div>
                </div>

                <div>
                    <label className='text-lg font-bold text-gray-800 my-2'>Confirm Password : </label>
                    <div className='flex bg-slate-200 bg-transparent border rounded-md p-2 text-lg focus-within:shadow-md'>
                        <input 
                            type={showConfiremPassword ?
                            "text":"password"} 
                            placeholder='Enter Confirm Password'
                            value={data.confirmPassword} 
                            name='confirmPassword'
                            onChange={handleOnChange}
                            required
                            className='w-full h-full outline-none bg-transparent' />
                        <div className='cursor-pointer text-xl'onClick={()=>setShowConfiremPassword((prev)=>!prev)} >
                            <span>
                            {
                            showConfiremPassword ?(<FaEyeSlash/>):(<FaEye/>)  
                            }   
                            </span>
                        </div>
                    </div>
                </div>
                <button className='w-full max-w-[150px] bg-red-600 px-6 py-2 text-white font-semibold rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-0 transition-all mx-auto block mt-6 hover:scale-100'>Sign up</button>
            </form>
            <p className=' my-5'>Already have account ? <Link to={"/login"} className='text-red-600 hover:underline hover:text-red-700' >Login</Link></p>
        </div>
    </div>
    </section>

);
}

export default SignUp
