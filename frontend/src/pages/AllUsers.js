import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import {MdModeEdit} from 'react-icons/md'
import ChangeUserRole from '../components/ChangeUserRole';
import { useSelector } from 'react-redux'; // For accessing the logged-in user's role

const AllUsers = () => {

    // Get logged-in user details (assuming it's in Redux)
    const user = useSelector(state => state?.user?.user);  // Access user details from Redux

    const [allUser,setAllUsers]=useState([])
    const [openUpdateRole,setOpenUpdateRole] =useState(false)
    const [updateUserDetails,setUpdateUserDetails] = useState({
        email:"",
        name:"",
        role:"",
        _id:""
    })

    const fetchAllUsers=async() =>{
       const fetchData= await fetch(SummaryApi.allUser.url,{
        method:SummaryApi.allUser.method,
        credentials:'include'

    })

    const dataResponse= await fetchData.json()

    if(dataResponse.success){
        setAllUsers(dataResponse.data)
        toast.success(dataResponse.messsage)
    }
    if(dataResponse.error){
        toast.error(dataResponse.messsage)
    }
    
     console.log(dataResponse)

    }
    useEffect(()=>{
        fetchAllUsers()
    },[])

return (
<>
    {
    user?.role === 'ADMIN' &&(         // additional add  only admin access and update all user role
    <div className='bg-white pb-4'>
        <table className='w-full userTable'>
            <thead>
                <tr className='bg-black text-white'>
                    <th>Sr. No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created Date</th>
                    <th>profilePic</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    allUser.map((el,index)=>{
                        return(
                            <tr>
                                <td>{index+1}</td>
                                <td>{el?.name}</td>
                                <td>{el?.email}</td>
                                <td>{el?.role}</td>
                                <td>{moment(el?.createdAt).format('L')}</td>
                                <td><img src={el?.profilePic} alt='progile pic ' className='w-10 h-10 rounded-full mx-auto'/></td>
                                <td>
                                    <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                                    onClick={()=>{
                                    setUpdateUserDetails(el)
                                    setOpenUpdateRole(true)}
                                    }
                                    >
                                        <MdModeEdit/>
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        {
            openUpdateRole && (
                <ChangeUserRole 
                    onClose={()=>setOpenUpdateRole(false)}
                    name={updateUserDetails.name} 
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )
        }
        
    </div>
    )
    }
</>
)
}

export default AllUsers
