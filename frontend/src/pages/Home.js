import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"} direction={"left"}/>
      <HorizontalCardProduct category={"earphones"} heading={"Popular's Earphones"}direction={"right"}/> {/*earphones watch category name  */}
      <HorizontalCardProduct category={"camera"} heading={"Popular's Cameras"}direction={"left"}/>  {/*watches watch category name  */}

      <VerticalCardProduct category={"mobiles"} heading={"Popular's Mobiles"}direction={"right"}/>{/*mobiles category name */}
      <VerticalCardProduct category={"airpodes"} heading={"Popular's Mouses"}direction={"right"}/>{/*Mouse category name */}
      <VerticalCardProduct category={"airpodes"} heading={"Popular's Televisions"}direction={"right"}/>{/*televisions category name */}
      <VerticalCardProduct category={"camera"} heading={"Popular's Cameras & Photography Stand Kit"}direction={"right"}/>{/*Cameras category name */}
      <VerticalCardProduct category={"earphones"} heading={"Popular's Earphones"}direction={"right"}/>{/*Earphones category name */}
      <VerticalCardProduct category={"earphones"} heading={"Popular's Bluetooth Speakers"}direction={"right"}/>{/*speakers category name */}
      <VerticalCardProduct category={"earphones"} heading={"Popular's Refrigerator"}direction={"right"}/>{/*refrigerator category name */}
      <VerticalCardProduct category={"earphones"} heading={"Popular's Trimmers"}direction={"right"}/>{/*trimmers category name */}
      

    
    
    </div>
  )
}

export default Home
