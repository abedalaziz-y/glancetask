import * as React from "react";
import { lazy,Suspense } from "react";
import firebase from "firebase/compat/app";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'antd/dist/antd.min.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { CURRENTUSER } from "./functions/auth";
import {  WishlistRout } from "./component/pages/Routes/User";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AllProducts from "./component/pages/AdminPages/product/Allproducts";
import { useState } from "react";

import { getWishlist } from './functions/user';
import { GETTRADERINFO } from "./functions/trader";
import './App.css'
import {
  AdminRoute, AdminRouteCreate, AdminRouteupdate, AdminRouteSubCategory, AdminRouteCreateBrand,
  AdminRouteAllProducts, AdminRouteupdateSub, AdminRouteCreatePeoduct,
  AllProductsRoute, AdminRouteupdateProduct, AdminRouteCreateCoupons, AdminRouteCreateColor, AdminRouteCreateTrader, AdminOrders, AdminDash
} from "./component/pages/Routes/admin";
import {

  LoadingOutlined,

} from '@ant-design/icons';
import Catalog from "./component/pages/Catalog";
import Details from "./component/pages/detail/Details";
///import with lazy
const Product = lazy(() => import('./component/product/product'))

const Login = lazy(() => import("./component/pages/Login"))
const Register = lazy(() => import("./component/pages/Register"))
const RegisterComplete = lazy(() => import("./component/pages/RegisterComplete"))
const Home = lazy(() => import("./component/pages/Home"))
const NavBar = lazy(() => import("./component/Bars/NavBar"))

const SubCategoryProduct = lazy(() => import("./component/subCategory/subcategoryProducts"));


const Footer = lazy(() => import("./component/footer/Footer")) ;
const SideCool = lazy(() => import("./component/Bars/SideBar"));
const SideForPhone = lazy(() => import("./component/Bars/SideForPhone")) ;
const NewNave = lazy(() => import("./component/Bars/newNave"))

const App = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const { width, height } = windowDimensions
  const dispatch = useDispatch()
  const [wishlistlen, setWishlistlen] = useState()
  const { user } = useSelector((state) => ({ ...state }))
  const [name, setName] = useState('')
  const [phone, setPhone] = useState()
  const [about, setAbout] = useState('')
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  useEffect(() => {


    
    GETTRADERINFO().then((res) => {
      if (res.data) {
        dispatch(({
          type: "TRADER",
          payload: res.data
        }))
      }
    })
    setWindowDimensions(getWindowDimensions())

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()

      


        CURRENTUSER(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGED_IN_USER",
              payload: {
              
                name: res.data.name,
                email: res.data.email,
                role: res.data.role,
                img: user.photoURL,
                picture: res.data.picture,
                token: idTokenResult.token,
                _id: res.data._id
              }
            })

          }).catch(err => console.log(err))
       
      }
    })
    
    //clean
    return () => unsubscribe()
    
  }, [dispatch])
  
  return (
       
    <div className="App"  >
      <Suspense fallback={
        <div className="col text-center text-dark p-5 h4">
          ~Gkance M <LoadingOutlined style={{ color: 'gold' }} /> vies
  
        </div>
      }>
{width<500&&     ( <NewNave />)
}  
        {width > 500 && (<NavBar />)
        }  


{user&&user.role==='admin'&&(<SideCool/>)}
      <SideForPhone />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        ltr={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>

   
        <Route path="/Admin/dashboard" element={<AdminDash />} />
        <Route path='*' element={<Home/>}/>
     
        <Route path="Login" element={<Login />} />
   
        <Route path="Register" element={<Register />} />
        <Route path="/Register/complete" element={<RegisterComplete />} />
        <Route path="/" element={<Home />} />

   
   
        <Route path="/user/wishlist" element={<WishlistRout />} />
     
      
        <Route path="/Admin/brands" element={<AdminRouteCreateBrand />} />
     
        <Route path="/Admin/categories" element={<AdminRouteCreate />} />
        <Route path="/Admin/coupon" element={<AdminRouteCreateCoupons />} />
        <Route path="/Admin/category/:slug" element={<AdminRouteupdate />} />
        <Route path="/Admin/subcategory" element={<AdminRouteSubCategory />} />
        <Route path="/Admin/SubCategory/:slug" element={<AdminRouteupdateSub />} />
        <Route path="/Admin/product" element={<AdminRouteCreatePeoduct />} />
        <Route path="/Admin/products/:count" element={<AllProductsRoute />} />
        <Route path="/Admin/products" element={<AllProductsRoute />} />
        <Route path="/Admin/product/:slug" element={<AdminRouteupdateProduct />} />
        

     
        <Route path="product/:slug" element={<Product />} />
        <Route path="/:slug/:slug" element={<SubCategoryProduct />} />
       
        <Route
            path="/:category/search/:keyword"
            element={<Catalog></Catalog>}
          ></Route>
 <Route path="/:category" element={<Catalog></Catalog>}></Route>
<Route path="/details/:category/:id" element={<Details></Details>}></Route>
      </Routes>
      <Footer name={name} phone={phone} about={about}/>
      </Suspense>
    </div>
 );

}

export default App