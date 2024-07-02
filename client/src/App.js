import logo from "./logo.svg";
import "./App.css";
import { useCallback, useState } from "react";
import{
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Cart from './pages/cart/Cart';
import Order from './pages/order/Order';
import OrderComplete from './pages/order/OrderComplete';
import CartItemsProvider from './pages/cart/CartItems';
import AddNotice from './pages/notice/AddNotice';
import NoticeList from './pages/notice/NoticeList';
import GetProduct from "./pages/productManage/getProduct";
import Modal from './pages/notice/Modal';
import Product from './pages/productManage/addProduct';
import UpdateProduct from './pages/productManage/updateProduct';
import Main from './pages/productManage/main';
import GetUser from './pages/userManage/getUser';
import Coupon from './pages/couponManage/addCoupon';
import Navbar from "./component/Navbar/navbar";
import Header from "./component/Header/header";
import Footer from "./component/Footer/footer";
import Login from "./component/login/Login";
import Register from "./component/register/Register"
import Sanlist from './pages/product/sanrio/sanlist/sanlist';
import Dislist from './pages/product/disney/dislist/dislist';
import Ghlist from './pages/product/ghibli/ghlist/ghlist';
import Mvlist from './pages/product/marvel/mvlist/mvlist';
import Mblist from './pages/product/moble/mblist/mblist';
function App(){
  return(
    <BrowserRouter>
    <Header/>
    <Navbar/>

    <Routes>
      <Route path='/Cart' element={<CartItemsProvider><Cart /></CartItemsProvider>} />
      <Route path='/Order' element={<CartItemsProvider><Order /></CartItemsProvider>} />
      <Route path='/Order-Complete' element={<OrderComplete/>}/>
      <Route path="/addnotice" element={<AddNotice/>}/>
      <Route path="/noticelist" element={<NoticeList/>}/>
      <Route path="/getproduct" element={<GetProduct/>}/>
      <Route path='/addproduct' element={<Product/>}/>
      <Route path="/modal" element={<Modal/>}/>
      <Route path='/updateproduct/:id' element={<UpdateProduct/>}/>
      <Route path="/" element={<Main/>}/>
      <Route path="/getuser" element={<GetUser/>}/>
      <Route path="/addcoupon" element={<Coupon/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/sanrio" element={<Sanlist />} />
      <Route path="/disney" element={<Dislist />} />
      <Route path="/ghibli" element={<Ghlist />} />
      <Route path="/marvel" element={<Mvlist />} />
      <Route path="/moble" element={<Mblist />} />
    </Routes>
    <Footer/>
    </BrowserRouter>
  );
}
export default App;
