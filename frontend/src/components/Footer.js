import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'
import Logo from './Logo';
import pay from '../assest/pay.png';
import play from '../assest/play.jpg';
import app from '../assest/app.jpg';
import { FaFacebook, FaTwitter, FaInstagram, FaPinterestP, FaYoutube } from 'react-icons/fa';
import { FaRegCopyright } from 'react-icons/fa';
const Footer = () => {
  return (
    <>
      <footer className="bg-slate-300 px-5 pt-5 py-3 section-p1 max-sm:px-10 md:px-10 ">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        <div className="col">
          <Link to={"/"}>
            <Logo className="logo" w={70} h={50} />
          </Link>
          <h4 className="text-lg font-semibold mb-2">Contact</h4>
          <p><strong>Address: </strong>Chandauli, Samastipur, Bihar, 848132</p>
          <p><strong>Phone: </strong>+91 8217863100</p>
          <p><strong>Hours: </strong>10:00 - 18:00, Mon - Sat</p>
          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <div className="icon flex space-x-4">
              <Link to={"#"} className="rounded-full p-2  bg-gray-200 hover:bg-blue-700  hover:text-white transition duration-300 ease-in-out">
                <FaFacebook size={24} />
              </Link>
              <Link to={"#"} className="rounded-full p-2 bg-gray-200 hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out">
                <FaTwitter size={24} />
              </Link>
              <Link to={"#"} className="rounded-full p-2 bg-gray-200 hover:bg-pink-600 hover:text-white transition duration-300 ease-in-out">
                <FaInstagram size={24} />
              </Link>
              <Link to={"#"} className="rounded-full p-2 bg-gray-200 hover:bg-red-600 hover:text-white transition duration-300 ease-in-out">
                <FaPinterestP size={24} />
              </Link>
              <Link to={"#"} className="rounded-full p-2 bg-gray-200 hover:bg-red-600 hover:text-white transition duration-300 ease-in-out">
                <FaYoutube size={24} />
              </Link>
            </div>
          </div>
        </div>

        <div className="col">
          <h4 className="text-lg font-semibold mb-4">About</h4>
          <Link to={"#"} className="block mb-2 hover:underline">About Us</Link>
          <Link to={"#"} className="block mb-2 hover:underline">Delivery Information</Link>
          <Link to={"#"} className="block mb-2 hover:underline">Privacy Policy</Link>
          <Link to={"#"} className="block mb-2 hover:underline">Terms & Conditions</Link>
          <Link to={"#"} className="block mb-2 hover:underline">Contact Us</Link>
        </div>

        <div className="col">
          <h4 className="text-lg font-semibold mb-4">My Account</h4>
          <Link to={"/login"} className="block mb-2 hover:underline">Sign In</Link>
          <Link to={"#"} className="block mb-2 hover:underline">View Cart</Link>
          <Link to={"#"} className="block mb-2 hover:underline">My Wishlist</Link>
          <Link to={"#"} className="block mb-2 hover:underline">Track My Order</Link>
          <Link to={"#"} className="block mb-2 hover:underline">Help</Link>
        </div>

        <div className="col install">
          <h4 className="text-lg font-semibold mb-4">Install App</h4>
          <p className="mb-4">From App Store or Google Play</p>
          <div className="flex space-x-2 mb-4">
            <img src={app} alt="App Store" className="w-28 h-auto" />
            <img src={play} alt="Google Play" className="w-28 h-auto" />
          </div>
          <p className="mb-4">Secured Payment Gateways</p>
          <img src={pay} alt="Payment Methods" className="min-w-md h-auto" />
        </div>
      </div>

      <div className="text-center mx-auto mt-2">
        <p className="inline-flex items-center">
          Copyright <FaRegCopyright aria-hidden="true" className="mx-1" /> 2024 Pankaj Kumar
        </p>
      </div>

    </footer>
    </>
  );
}

export default Footer;
