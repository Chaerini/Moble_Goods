import logo from "./logo.svg";
import "./App.css";
import { useCallback, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./pages/cart/Cart";
import Order from "./pages/order/Order";
import OrderComplete from "./pages/order/OrderComplete";
import CartItemsProvider from "./pages/cart/CartItems";
import AddNotice from "./pages/notice/AddNotice";
import GetNotice from "./pages/notice/getNotice";
import GetProduct from "./pages/productManage/getProduct";
import Modal from "./pages/notice/Modal";
import Product from "./pages/productManage/addProduct";
import UpdateProduct from "./pages/productManage/updateProduct";
import GetUser from "./pages/userManage/getUser";
import Coupon from "./pages/couponManage/addCoupon";
import Login from "./component/login/Login";
import Register from "./component/register/Register";
import Profile from "./pages/profile/Profile";
import MyReview from "./pages/myreview/MyReview";
import MyCoupon from "./pages/mycoupon/MyCoupon";
import UpdateUser from "./pages/userManage/updateUser";
import GetCoupon from "./pages/couponManage/getCoupon";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Cart" element={<CartItemsProvider><Cart /></CartItemsProvider>}/>
        <Route path="/Order" element={ <CartItemsProvider><Order /></CartItemsProvider>}/>
        <Route path="/Order-Complete" element={<OrderComplete />} />
        <Route path="/addnotice" element={<AddNotice />} />
        <Route path="/getnotice" element={<GetNotice/>} />
        <Route path="/getproduct" element={<GetProduct />} />
        <Route path="/addproduct" element={<Product />} />
        <Route path="/modal" element={<Modal />} />
        <Route path="/updateproduct/:id" element={<UpdateProduct />} />
        <Route path="/getuser" element={<GetUser />} />
        <Route path="/addcoupon" element={<Coupon />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/myreview" element={<MyReview />} />
        <Route path="/mycoupon" element={<MyCoupon />} />
        <Route path="/updateuser" element={<UpdateUser/>}/>
        <Route path="/getcoupon" element={<GetCoupon/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
