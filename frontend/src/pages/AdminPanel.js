import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import {FaRegCircleUser} from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
    const user = useSelector(state=>state?.user?.user)

    const navigate = useNavigate()

    useEffect(()=>{
        if(user?.role!==ROLE.ADMIN){
            navigate("/")
        }
    },[user,navigate])

return (
    <div className='min-h-[calc(100vh-120px)] flex max-sm:hidden'> {/* hidden lg:block */}
        <aside className='bg-white min-h-full w-full max-w-48 customShadow'>
            <div className='h-32 flex justify-center items-center flex-col'>
                <div className='text-5xl cursor-pointer relative flex justify-center' >
                    {
                        // user profile pic is availabe then set pic in navbar
                        user?.profilePic?(  
                            <img src={user?.profilePic} alt={user?.name} className='w-20 h-20 rounded-full mt-3'/> //mt-3 additional add for navbar image space purpose
                        ):(    
                        // if profile pic not availabe then set profile default icon in navbar
                        <FaRegCircleUser/>
                        )
                    }
                </div>
                <p className='capitalize text-lg font-semibold'>{user?.name || "User Not Exits"}</p>
                <p className='text-sm'>{user?.role}</p>
            </div>

            {/*navigation all user */}

            {/* Display navigation links only if the user exists */}
            {user?.name && (
            <div>
                <nav className='grid p-4'>
                    {
                        user?.role === 'ADMIN' &&(   // addtion setup for admin role purpose 
                            <Link to={"all-users"} className='px-5 py-1 hover:bg-slate-100 rounded-lg'>All Users</Link>
                        )
                    }
                    <Link to={"all-products"} className='px-5 py-1 hover:bg-slate-100 rounded-lg'>All Product</Link>
                    <Link to={"all-orders"} className='px-5 py-1 hover:bg-slate-100 rounded-lg'>All Orders</Link>
                </nav>
            </div>
            )}
        </aside>
        <main className='w-full h-full p-2'>
            <Outlet/>
        </main>
    </div>
)
}

export default AdminPanel
