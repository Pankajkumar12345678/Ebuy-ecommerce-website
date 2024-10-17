import React, { useEffect, useState } from 'react'
import { useLocation} from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'

const SearchProduct = () => {
    const query =useLocation()
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)

    console.log("query",query.search)

    const fetchProduct =async()=>{
      setLoading(true)
      const response = await fetch(SummaryApi.searchProduct.url+query?.search)
      const dataResponse = await response.json()
      setLoading(false)

      setData(dataResponse?.data)
    }
    useEffect(()=>{
      fetchProduct()
    },[query])

  return (
    <div className='container mx-auto p-4'>
      {
        loading && (
          <div className="flex flex-col justify-center items-center h-32 space-y-4">
            <p className="text-lg font-semibold text-blue-600">Loading product, please wait...</p>
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        )
      }

      <p className='text-slate-600 font-bold text-lg my-3'>Search Results : {data?.length}</p>

      {
        data?.length ===0 && !loading && (
            <p className='bg-white text-lg text-center p-4'>No Data Found...</p>
        )
      }

      {
        data?.length !==0 && !loading &&(
              <VerticalCard loading={loading} data={data}/>
        )
      }
      
    </div>
  )
}

export default SearchProduct
 //15:10