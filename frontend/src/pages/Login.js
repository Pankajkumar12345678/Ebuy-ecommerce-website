import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common/index';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword,setShowPassword]=useState(false);
    const [data,setData]=useState({
        email:"",
        password:""
    })
    // login successfully then redirect Home page
    const navigate = useNavigate()
    
    const {fetchUserDetails,fetchUserAddToCart} = useContext(Context)

    

    const handleOnChange=(e)=>{
        const {name,value}=e.target

        setData((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();

        const dataResponse = await fetch(SummaryApi.signIn.url,{
            method:SummaryApi.signIn.method,
            credentials:'include',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        })

        const dataApi= await dataResponse.json()
        if(dataApi.success){
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart()
            
        }
        if(dataApi.error){
            toast.error(dataApi.message)

        }

    }



    console.log("data login",data);
  return (
    <section id='login'>
        <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto shadow-xl rounded-2xl custom-background'>
            <div className='w-20 h-20 mx-auto'>
                <img src={loginIcons} alt='login icons' className='rounded-full'/>
            </div>

            <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                <div className='grid'>
                    <label className='text-lg font-bold text-gray-800 '>Email : </label>
                    <div className='bg-slate-200 bg-transparent border rounded-md p-2 text-lg focus-within:shadow-md'>
                        <input 
                            type='email' 
                            placeholder='Enter Email' 
                            name='email'
                            value={data.email}
                            onChange={handleOnChange}
                            // required
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
                            // required
                            className='w-full h-full outline-none bg-transparent' />
                        <div className='cursor-pointer text-xl'onClick={()=>setShowPassword((prev)=>!prev)} >
                            <span>
                                {
                                showPassword ?(<FaEyeSlash/>):(<FaEye/>)  
                                }   
                            </span>
                        </div>
                    </div>
                    <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                        Forgot Password ?
                    </Link>
                </div>

                <button className='w-full max-w-[150px] bg-red-600 px-6 py-2 text-white font-semibold rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-0 transition-all mx-auto block mt-6 hover:scale-100'>Login</button>
            </form>
            <p className=' my-5'>Don't have account ? <Link to={"/sign-up"} className='text-red-600 hover:underline hover:text-red-700' >Sign up</Link></p>
        </div>
      </div>
    </section>
  )
}

export default Login
