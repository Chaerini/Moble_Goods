import logo from "./logo.svg";
import "./App.css";
import { useCallback, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./pages/cart/Cart";
import Order from "./pages/order/Order";
import OrderComplete from "./pages/order/OrderComplete";
import ReviewWrite from "./pages/review/ReviewWrite";
import AddNotice from "./pages/notice/AddNotice";
import GetProduct from "./pages/productManage/getProduct";
import Product from './pages/productManage/addProduct';
import Main from './pages/productManage/main';
import GetUser from './pages/userManage/getUser';
import Coupon from './pages/couponManage/addCoupon';
import Login from "./component/login/Login";
import Register from "./component/register/Register";
import MyCoupon from "./pages/mycoupon/MyCoupon";
import MyReview from "./pages/myreview/MyReview";
import MyOrder from "./pages/myorder/MyOrder";
import AdminMain from "./pages/admin/adminMain/AdminMain";
import GetCoupon from "./pages/couponManage/getCoupon";
import GetNotice from "./pages/notice/GetNotice";
import UpdateNotice from "./pages/notice/updateNotice";
import Withdraw from "./pages/withdraw/Withdraw";
import Search from "./component/search/searchProduct";
import UpdateUserMember from "./pages/userManage/updateUserMember";
import Profile from './pages/profile/Profile';
import Myqna from './pages/customer/Myqna';
import UpdateCoupon from "./pages/couponManage/updateCoupon";
import SubPage from "./pages/product/subpage";
import SearchUser from "./component/search/searchUser";
import Faq from "./pages/customer/Faq";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Order" element={<Order />} />
          <Route path="/Order-Complete" element={<OrderComplete />} />
          <Route path="/ReviewWrite" element={<ReviewWrite />} />
          <Route path="/addnotice" element={<AddNotice />} />
          <Route path="/getproduct" element={<GetProduct />} />
          <Route path="/addproduct" element={<Product />} />
          <Route path="/updatenotice/:id" element={<UpdateNotice />} />
          <Route path="/" element={<Main />} />
          <Route path="/getuser" element={<GetUser />} />
          <Route path="/addcoupon" element={<Coupon />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/myorder" element={<MyOrder />} />
          <Route path="/myreview" element={<MyReview />} />
          <Route path="/mycoupon" element={<MyCoupon />} />
          <Route path="/getcoupon" element={<GetCoupon />} />
          <Route path="/getnotice" element={<GetNotice />} />
          <Route path="/admin" element={<AdminMain />} />
          <Route path="/updatecoupon/:id" element={<UpdateCoupon/>}/>
          <Route path="/search" element={<Search />} />
          <Route path="/updateusermember/:id" element={<UpdateUserMember />} />
          <Route path="/myqna" element={<Myqna/>} />
          <Route path="/category/:categoryId" element={<SubPage />} />
          <Route path="/product/:productId" element={<SubPage />} />
          <Route path="/category/:categoryId/subcategory/:subCategoryId" element={<SubPage />} />
          <Route path="/category/:categoryId/subcategory/:subCategoryId/product/:productId" element={<SubPage />} />
          <Route path="/category/:categoryId/product/:productId" element={<SubPage />} />
          <Route path="/searchUser" element={<SearchUser/>}/>
          <Route path="/faq" element={<Faq/>}/>

      </Routes>
    </BrowserRouter>
  );
}
export default App;
