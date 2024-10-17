import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import displayINRCurrency from '../helpers/displayCurrency'
import { FaStar } from 'react-icons/fa';
import { FaStarHalf } from 'react-icons/fa';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  });

  const params = useParams();
  // console.log("product id", params);

  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0
  });
  const [zoomImage, setZoomImage] = useState(false);
  const navigate = useNavigate()

  const {fetchUserAddToCart} = useContext(Context)
  
  // add to cart handle
  const handleAddToCart=async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
  }

  // buy product handle
  const handleBuyProduct = async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
    navigate("/cart")
  }

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.productDetails.url, {
        method: SummaryApi.productDetails.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: params?.id,
        }),
      });
      setLoading(false);
      const dataResponse = await response.json();
      setData(dataResponse?.data || {});
      setActiveImage(dataResponse?.data?.productImage[0]);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  console.log("product details data", data);

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();

    let x = (e.clientX - left) / width;
    let y = (e.clientY - top) / height;

    // Clamp x and y values between 0 and 1 to prevent moving beyond image edges
    x = Math.min(Math.max(x, 0), 1);
    y = Math.min(Math.max(y, 0), 1);

    setZoomImageCoordinate({
      x,
      y,
    });
  }, []); //zoomImageCoordinate 

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col md:flex-row gap-4">  {/*lg:flex-row */} 
        
        {/* Product Image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-2">
          <div className="h-[300px] w-[350px] lg:h-96 lg:w-96 bg-slate-200 rounded-xl relative p-2">  {/*update w-[300px] to w-[350px] */}
            <img
              src={activeImage}
              alt={activeImage}
              className="w-full h-full object-scale-down mix-blend-multiply rounded-xl"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />

            {/* Product Image Zoom setup */}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0 rounded-xl">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`,
                  }}
                ></div>
              </div>
            )}
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading?.map((el,index) => (
                  <div
                    className="h-20 w-20 bg-slate-200 rounded-xl animate-pulse"
                    key={"loadingImage"+index}
                  ></div>
                ))}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage?.map((imgURL, index) => (
                  <div
                    className="h-20 w-20 bg-slate-200 rounded-lg p-1 cursor-pointer"
                    key={imgURL}
                  >
                    <img
                      src={imgURL}
                      alt={imgURL}
                      className="w-full h-full object-scale-down mix-blend-multiply rounded-lg"
                      onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                      onClick={() => handleMouseEnterProduct(imgURL)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      {/* Product Details */}
      {
        loading ? (
          <div className="grid w-full gap-1">
            <p className="bg-slate-200 animate-pulse h-6 lg:h-8 rounded-full text-lg inline-block w-full"></p>
            <h2 className="text-2xl lg:text-4xl font-medium h-6 bg-slate-200 animate-pulse rounded-full lg:h-8">
              <p></p>
            </h2>
            <p className="capitalize text-slate-400 text-2xl font-medium h-6 bg-slate-200 animate-pulse rounded-full min-w-[100px] lg:h-8"></p>
            <div className="text-yellow-500 flex items-center gap-1 h-6 bg-slate-200 animate-pulse rounded-full lg:h-8"></div>
            <h2 className="capitalize text-2xl font-medium text-green-600 h-6 bg-slate-200 animate-pulse rounded-full lg:h-8">
              <p></p>
            </h2>
            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 animate-pulse lg:h-8 w-full">
              <p className="text-red-600 bg-slate-200 h-6 lg:h-8 w-full rounded-full"></p>
              <p className="text-slate-500 line-through bg-slate-200 lg:h-8 w-full rounded-full"></p>
            </div>
            <div className="flex items-center gap-3 my-2 w-full">
              <button className="h-6 bg-slate-200 rounded-full animate-pulse w-full lg:h-8"></button>
              <button className="h-6 bg-slate-200 rounded-full animate-pulse w-full lg:h-8"></button>
            </div>
            <div>
              <p className="text-slate-600 font-semibold text-lg my-1 h-6 lg:h-8 bg-slate-200 rounded-full animate-pulse"></p>
              <p className="h-20 bg-slate-200 rounded-xl animate-pulse"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-green-600 text-white px-5 py-1 rounded-full text-lg inline-block w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">
              {data?.productName}
            </h2>
            <p className="capitalize text-slate-400 text-2xl font-medium">
              {data?.category}
            </p>
            <div className="text-yellow-500 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <h2 className="capitalize text-2xl font-medium text-green-600">
              Special price
            </h2>
            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
              <p className="text-red-600">
                {displayINRCurrency(data?.sellingPrice)}
              </p>
              <p className="text-slate-500 line-through">
                {displayINRCurrency(data?.price)}
              </p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <button className="font-medium text-lg custome-bg-orange text-white px-3 py-1 rounded-lg min-w-[120px]"
                onClick={(e)=>handleBuyProduct(e,data?._id)}
              >
                Buy Now
              </button>
              <button className="font-medium text-lg custome-bg-orange-buy text-white px-3 py-1 rounded-lg min-w-[120px]" 
                onClick={(e)=>handleAddToCart(e,data?._id)}
              >
                Add To Cart
              </button>
            </div>
            <div>
              <p className="text-slate-600 font-semibold text-lg my-1">
                Description :
              </p>
              <p className="font-semibold capitalize text-sm line-clamp-5 overflow-hidden">
                {data?.description}
              </p>
            </div>
          </div>
        )
      }
      </div>

      {/* Recommended Product in Product Details section */}
      {data?.category && (
        <CategoryWiseProductDisplay
          category={data?.category}
          heading={"Recommended Products"}
        />
      )}
    </div>
  );
};

export default ProductDetails;
