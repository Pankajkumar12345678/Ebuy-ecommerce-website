import React, { useContext, useState } from 'react'
import Logo from './Logo'
import {GrSearch} from 'react-icons/gr';
import {FaRegCircleUser} from "react-icons/fa6";
import {FaShoppingCart} from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';



const Header = () => {

    // menu bar 
    const [menuDisplay,setMenuDisplay] = useState(false)
    
    const user = useSelector(state=>state?.user?.user)
    // print user all information 
    // console.log("user header ",user)

    const context = useContext(Context)

    //clear all the data into the redux and reload
    const dispatch= useDispatch()

    // logout successfully then redirect login page
    const navigate = useNavigate()

    const searchInput = useLocation()
    const URLSearch = new URLSearchParams(searchInput?.search)
    const searchQuery= URLSearch.getAll("q")
    const [search,setSearch] = useState(searchQuery)

    // add logout funtionality
    const handleLogout = async() =>{
        const fetchData = await fetch(SummaryApi.logout_user.url,{
            method : SummaryApi.logout_user.method,
            credentials : 'include'
        })

        const data = await fetchData.json()
        
        if(data.success){
            toast.success(data.message)
            dispatch(setUserDetails(null)) 
            navigate('/') // '/login' logout successfully then redirect home page
            
            
        }
        if(data.error){
            toast.error(data.message)
        }
    }
// console.log("header add to cart count ",context)

// search funtion
const handleSearch=(e)=>{
    const {value} =e.target
    setSearch(value)
    if(value){
        navigate(`/search?q=${value}`)
    }
    else{
        navigate('/search')
    }

}
return (
    <div>
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
        <div className='h-full container mx-auto flex items-center max-sm:px-4 justify-between'>
            <div className=''> 
                <Link to={"/"}>
                    <Logo w={90} h={50} />
                </Link>
            </div>
            <div className='hidden lg:flex items-center w-full h-9 justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
                <input type='text' placeholder='Search Product here...' className='w-full outline-none' onChange={handleSearch} value={search}/>
                <div className='text-lg min-w-[50px] h-9 bg-red-600 flex items-center justify-center rounded-r-full text-white cursor-pointer'><GrSearch/></div>
            </div>
            <div className='flex items-center gap-7'>

                <div className='relative flex justify-center'>
                    
                    {/* user not login then profile icon not display */}
                    {
                        user?._id && (
                        <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>setMenuDisplay(prev => !prev)} onMouseLeave={() => setTimeout(() => setMenuDisplay(prev => (prev === true ? !prev : prev)), 7000)} >
                        {
                            // user profile pic is availabe then set pic in navbar
                            user?.profilePic?(  
                                <img src={user?.profilePic} alt={user?.name} className='w-10 h-10 rounded-full'/>
                            ):(    
                            // if profile pic not availabe then set profile default icon in navbar
                            <FaRegCircleUser/>
                            )
                        }
                        </div>
                        )
                    }
                    

                    {/* pop up setup  the role is admin then show Admin Panel link in the popup user?.role === 'ADMIN' &&*/}
                    {
                    menuDisplay && user?._id && (
                    <div className='absolute  bg-white bottom-0 flex flex-col gap-4 top-11 h-fit p-3 shadow-lg rounded rounded-b-xl '> {/*  set the flex flex-col gap-4  rounded-b-xl additional adding css for pop interactive design purpose  */}
                        {
                            user?.role === ROLE.ADMIN &&(
                            <nav className='max-sm:hidden'>
                                <Link to={"/admin-panel/all-products"}  // click admin panel then navigate the all product section
                                    className='whitespace-nowrap hover:bg-slate-100 p-2 rounded-xl hover:shadow-sm' onClick={()=>setMenuDisplay(prev => !prev)}>
                                    Admin Panel
                                </Link>
                            </nav>
                            )
                        }
                        <nav>
                            <Link to={'/order'} className='whitespace-nowrap hover:bg-slate-100 p-2 rounded-xl hover:shadow-sm' onClick={()=>setMenuDisplay(prev => !prev)}>Orders</Link>
                        </nav>
                    </div>
                    )
                    }

                </div>

                {/* add to cart */}
                {
                    user?._id && (
                        <Link to={"/cart"} className='text-2xl cursor-pointer relative'>
                            <span>
                                <FaShoppingCart/>
                            </span>
                            <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                                <p className='text-sm'>{context?.cartProductCount}</p>
                            </div>
                        </Link>
                    )
                }
                
                <div className='md:mr-2'> {/*additional adding for right login button gap md:mr-2 */}
                {
                user?._id?(
                    <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</button>
                    )
                    :(
                    <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Login</Link>
                    )
                }
                </div>
            </div>
        </div>
      </header>
    </div>
  )
}

export default Header
