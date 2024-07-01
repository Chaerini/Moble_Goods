import logo from './logo.svg';
import './App.css';
import { useCallback, useState } from "react";
import{
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Cart from './pages/cart/Cart';
import AddNotice from './pages/notice/AddNotice';
import NoticeList from './pages/notice/NoticeList';
import GetProduct from "./pages/productManage/getProduct";
import Modal from './pages/notice/Modal';
import Product from './pages/productManage/addProduct';
import UpdateProduct from './pages/productManage/updateProduct';
import Main from './pages/productManage/main';
import GetUser from './pages/userManage/getUser';
import Coupon from './pages/couponManage/addCoupon';
function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path='/Cart' element={<Cart/>}/>
      <Route path="/addnotice" element={<AddNotice/>}/>
      <Route path="/noticelist" element={<NoticeList/>}/>
      <Route path="/getproduct" element={<GetProduct/>}/>
      <Route path='/addproduct' element={<Product/>}/>
      <Route path="/modal" element={<Modal/>}/>
      <Route path='/updateproduct/:id' element={<UpdateProduct/>}/>
      <Route path="/" element={<Main/>}/>
      <Route path="/getuser" element={<GetUser/>}/>
      <Route path="/addcoupon" element={<Coupon/>}/>
    </Routes>
    </BrowserRouter>
  )
}
export default App;
