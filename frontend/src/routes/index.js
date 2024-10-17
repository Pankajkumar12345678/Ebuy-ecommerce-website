import { createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassword from '../pages/ForgotPassword'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import Success from '../pages/Successpay'
import Cancel from '../pages/Cancel'
import OrderPage from '../pages/OrderPage'
import AllOrder from '../pages/AllOrder'


const router=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[{
            path:"",
            element:<Home/>
        },
        {
            path:"login",
            element:<Login/>
        },
        {
            path:"forgot-password",
            element:<ForgotPassword/>
        },
        {
            path:"sign-up",
            element:<SignUp/>
        },
        {
            path:"product-category", //  /:categoryName remove because show in url category
            element:<CategoryProduct/>
        },
        {
            path:"product/:id",           // ProductDetails
            element:<ProductDetails/>
        },
        {
            path:"cart",         // Add to Card Product pages
            element:<Cart/>
        },
        {
            path:"success",       //payment Success page
            element:<Success/>
        },
        {
            path:"cancel",        //payment Cancel page
            element:<Cancel/>
        },
        {
            path:"search",             // Search Product pages
            element:<SearchProduct/>
        },
        {
            path:"order",              // Order Product pages
            element:<OrderPage/>
        },
        {
            path:"admin-panel",
            element:<AdminPanel/>,
            children:[
                {
                    path:"all-users",
                    element:<AllUsers/>
                },
                {
                    path:"all-products",
                    element:<AllProducts/>
                },
                {
                    path:"all-orders",
                    element:<AllOrder/>
                }


                // AllOrder
            ]
        }
    ]
    }
])

export default router