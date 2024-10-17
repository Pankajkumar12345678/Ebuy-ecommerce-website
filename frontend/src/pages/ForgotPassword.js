import React, { useState } from 'react';
import loginIcons from '../assest/signin.gif';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../common/index';

const ForgotPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
});

    // reset successfully then redirect login page
    const navigate = useNavigate()

const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
        ...prev,
        [name]: value,
    }));
};

const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
        toast.error("Passwords do not match.");
        return;
    }

    try {
      const response = await fetch(SummaryApi.forgotPass.url,{
        method:SummaryApi.forgotPass.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData.message);
        navigate("/login")
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("Error during password reset.");
      console.error("Error during password reset:", error);
    }
  };
console.log(data)
  return (
    <section id='forgot-password'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto shadow-xl rounded-2xl custom-background'>
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <img src={ "https://cdn.pixabay.com/animation/2022/12/05/10/47/10-47-58-930_512.gif" || loginIcons} alt='login icons' />
          </div>

          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='grid'>
              <label className='text-lg font-bold text-gray-800'>Email :</label>
              <div className='bg-slate-200 bg-transparent border rounded-md p-2 text-lg focus-within:shadow-md'>
                <input 
                  type='email' 
                  placeholder='Enter Email' 
                  name='email'
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent' 
                />
              </div>
            </div>

            <div>
              <label className='text-lg font-bold text-gray-800 my-2'>New Password :</label>
              <div className='flex bg-slate-200 bg-transparent border rounded-md p-2 text-lg focus-within:shadow-md'>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder='Enter New Password'
                  value={data.password} 
                  name='password'
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent' 
                />
                <div className='cursor-pointer text-xl' onClick={() => setShowPassword(prev => !prev)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <div>
              <label className='text-lg font-bold text-gray-800 my-2'>Confirm Password :</label>
              <div className='flex bg-slate-200 bg-transparent border rounded-md p-2 text-lg focus-within:shadow-md'>
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder='Enter Confirm Password'
                  value={data.confirmPassword} 
                  name='confirmPassword'
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent' 
                />
                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword(prev => !prev)}>
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <button className='w-full max-w-[150px] bg-red-600 px-6 py-2 text-white font-semibold rounded-lg shadow hover:bg-red-700 focus:outline-none transition-all mx-auto block mt-6 hover:scale-100'>
              Reset
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
