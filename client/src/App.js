import logo from "./logo.svg";
import "./App.css";
import { useCallback, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./pages/cart/Cart";
import Order from "./pages/order/Order";
import OrderComplete from "./pages/order/OrderComplete";
import CartItemsProvider from "./pages/cart/CartItems";
import ReviewWrite from "./pages/review/ReviewWrite";
import AddNotice from "./pages/notice/AddNotice";
import GetProduct from "./pages/productManage/getProduct";
import Modal from './pages/notice/Modal';
import Product from './pages/productManage/addProduct';
import UpdateProduct from './pages/productManage/updateProduct';
import Main from './pages/productManage/main';
import GetUser from './pages/userManage/getUser';
import UpdateUser from "./pages/userManage/updateUser";
import Coupon from './pages/couponManage/addCoupon';
import Login from "./component/login/Login";
import Register from "./component/register/Register";
import Sanlist from "./pages/product/sanrio/sanlist/sanlist";
import Dislist from "./pages/product/disney/dislist/dislist";
import Ghlist from "./pages/product/ghibli/ghlist/ghlist";
import Mvlist from "./pages/product/marvel/mvlist/mvlist";
import Mblist from "./pages/product/moble/mblist/mblist";
import MyCoupon from "./pages/mycoupon/MyCoupon";
import MyReview from "./pages/myreview/MyReview";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import GetCoupon from "./pages/couponManage/getCoupon";
import GetNotice from "./pages/notice/getNotice";
import UpdateNotice from "./pages/notice/updateNotice";
import Withdraw from "./pages/withdraw/Withdraw";
import Search from "./component/search/search";
import UpdateUserMember from "./pages/userManage/updateUserMember";
import Profile from './pages/profile/Profile';
import Myqna from './pages/customer/Myqna';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/Cart"
          element={
            <CartItemsProvider>
              <Cart />
            </CartItemsProvider>
          }
        />
        <Route
          path="/Order"
          element={
            <CartItemsProvider>
              <Order />
            </CartItemsProvider>
          }
        />
        <Route path="/Order-Complete" element={<OrderComplete />} />
        <Route path="/ReviewWrite" element={<ReviewWrite />} />
        <Route path="/addnotice" element={<AddNotice />} />
        <Route path="/getproduct" element={<GetProduct />} />
        <Route path="/addproduct" element={<Product />} />
        <Route path="/modal" element={<Modal />} />
        <Route path="/updateproduct/:id" element={<UpdateProduct />} />
        <Route path="/updatenotice/:id" element={<UpdateNotice />} />
        <Route path="/" element={<Main />} />
        <Route path="/getuser" element={<GetUser />} />
        <Route path="/addcoupon" element={<Coupon />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/sanrio" element={<Sanlist />} />
        <Route path="/disney" element={<Dislist />} />
        <Route path="/ghibli" element={<Ghlist />} />
        <Route path="/marvel" element={<Mvlist />} />
        <Route path="/moble" element={<Mblist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/myreview" element={<MyReview />} />
        <Route path="/mycoupon" element={<MyCoupon />} />
        <Route path="/getcoupon" element={<GetCoupon />} />
        <Route path="/getnotice" element={<GetNotice />} />
        <Route path="/admin" element={<Dashboard />} />
        {/** 
        <Route path="sanrio/kittyproduct" element={<KittyProduct />} />
        <Route path="sanrio/kuroproduct" element={<KuroProduct />} />
        <Route path="disney/frozenproduct" element={<FrozenProduct />} />
        <Route path="disney/insideoutproduct" element={<InsideOutProduct />} />
        <Route path="disney/littleproduct" element={<LittleMermaidProduct />} />
        <Route path="disney/rapunzelproduct" element={<RapunzelProduct />} />
        <Route path="ghibli/castleproduct" element={<CastleProduct />} />
        <Route path="ghibli/ponyoproduct" element={<PonyoProduct />} />
        <Route path="ghibli/spiritproduct" element={<SpiritProduct />} />
        <Route path="ghibli/totoroproduct" element={<TotoroProduct />} />
        <Route path="marvel/ironproduct" element={<IronProduct />} />
        <Route path="marvel/captainproduct" element={<CaptainProduct />} />
        <Route path="marvel/thorproduct" element={<ThorProduct />} />
        <Route path="marvel/spiderproduct" element={<SpiderProduct />} />
        <Route path="moble/phonecaseproduct" element={<PhoneCaseProduct />} />
        <Route path="moble/chargerproduct" element={<ChargerProduct />} />
        <Route path="moble/earphoneproduct" element={<EarphoneProduct />} />
        <Route path="moble/standproduct" element={<StandProduct />} />
        */}
        <Route path="/search" element={<Search />} />
        <Route path="/updateuser/:id" element={<UpdateUser />} />
        <Route path="/updateusermember/:id" element={<UpdateUserMember />} />
        <Route path="/myqna" element={<Myqna/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
