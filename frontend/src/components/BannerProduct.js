import React, { useEffect, useState } from 'react';
import image1 from '../assest/banner/img1.webp';
import image2 from '../assest/banner/img2.webp';
import image3 from '../assest/banner/img3.jpg';
import image4 from '../assest/banner/img4.jpg';
import image5 from '../assest/banner/img5.webp';
import image6 from '../assest/banner/desktopbanner1.jpg';
import image7 from '../assest/banner/desktopbanner2.jpg';

import image1Mobile from '../assest/banner/img1_mobile.jpg';
import image2Mobile from '../assest/banner/img2_mobile.webp';
import image3Mobile from '../assest/banner/img3_mobile.jpg';
import image4Mobile from '../assest/banner/img4_mobile.jpg';
import image5Mobile from '../assest/banner/img5_mobile.png';

import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6';

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Initial check for mobile or desktop

  const desktopImages = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
  ];

  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];

  const images = isMobile ? mobileImages : desktopImages; // Choose the correct image set based on screen size

  const nextImage = () => {
    if (currentImage < images.length - 1) {
      setCurrentImage((prev) => prev + 1);
    } else {
      setCurrentImage(0);
    }
  };

  const prevImage = () => {
    if (currentImage !== 0) {
      setCurrentImage((prev) => prev - 1);
    } else {
      setCurrentImage(images.length - 1);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Update isMobile on resize
    };

    window.addEventListener('resize', handleResize);

    const interval = setInterval(() => {
      nextImage(); // Automatically move to the next image
    }, 5000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval); // Clean up interval on unmount
    };
  }); //[currentImage]--> this is a dependancy 

  return (
    <div className='container mx-auto px-4 rounded'>
      <div className='h-56 md:h-72 w-full bg-slate-200 relative rounded-lg overflow-hidden'>
        <div className='absolute z-10 w-full h-full md:flex items-center hidden '>
          <div className='flex justify-between w-full text-2xl p-1'>
            <button onClick={prevImage} className='bg-white shadow-md rounded-full hover:bg-gray-100'>
              <FaAngleLeft />
            </button>
            <button onClick={nextImage} className='bg-white shadow-md rounded-full hover:bg-gray-100'>
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* desktop and tablet version */}
        {!isMobile && (
          <div className='hidden md:flex h-full w-full overflow-hidden'>
            {desktopImages.map((imageURL, index) => (
              <div
                className='w-full h-full min-w-full min-h-full transition-all'
                key={imageURL}
                style={{ transform: `translateX(-${currentImage * 100}%)` , scrollBehavior: 'smooth'}}
              >
                <img src={imageURL} alt='banner' className='w-full h-full' />
              </div>
            ))}
          </div>
        )}

        {/* mobile version */}
        {isMobile && (
          <div className='flex h-full w-full overflow-hidden md:hidden'>
            {mobileImages.map((imageURL, index) => (
              <div
                className='w-full h-full min-w-full min-h-full transition-all'
                key={imageURL}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageURL} alt='banner' className='w-full h-full object-fill' />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerProduct;
