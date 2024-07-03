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
import PomProduct from "./pages/product/sanrio/pompom/pomproduct";
import CinnaProduct from "./pages/product/sanrio/cinnamo/cinnaproduct";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import KittyProduct from "./pages/product/sanrio/kitty/kittyproduct";
import KuroProduct from "./pages/product/sanrio/kuromi/kuroproduct";
import FrozenProduct from "./pages/product/disney/frozen/frozenproduct";
import InsideOutProduct from "./pages/product/disney/insideout/insideoutproduct";
import LittleMermaidProduct from "./pages/product/disney/littlemermaid/littleproduct";
import RapunzelProduct from "./pages/product/disney/rapunzel/rapunzelproduct";
import CastleProduct from "./pages/product/ghibli/castle/castleproduct";
import PonyoProduct from "./pages/product/ghibli/ponyo/ponyoproduct";
import SpiritProduct from "./pages/product/ghibli/spiritedaway/spiritproduct";
import TotoroProduct from "./pages/product/ghibli/totoro/totoroproduct";
import IronProduct from "./pages/product/marvel/ironman/ironproduct";
import CaptainProduct from "./pages/product/marvel/captainamerica/captainproduct";
import ThorProduct from "./pages/product/marvel/thor/thorproduct";
import SpiderProduct from "./pages/product/marvel/spiderman/spiderproduct";
import PhoneCaseProduct from "./pages/product/moble/phonecase/phonecaseproduct";
import ChargerProduct from "./pages/product/moble/charger/chargerproduct";
import EarphoneProduct from "./pages/product/moble/earphone/earphoneproduct";
import StandProduct from "./pages/product/moble/stand/standproduct";
import PomDetail from "./pages/product/sanrio/pompom/pomdetail";
import GetCoupon from "./pages/couponManage/getCoupon";
import GetNotice from "./pages/notice/getNotice";
import UpdateNotice from "./pages/notice/updateNotice";
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
        <Route path="/updatenotice/:id" element={<UpdateNotice/>}/>
        <Route path="/" element={<Main />} />
        <Route path="/getuser" element={<GetUser />} />
        <Route path="/addcoupon" element={<Coupon />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sanrio" element={<Sanlist />} />
        <Route path="/disney" element={<Dislist />} />
        <Route path="/ghibli" element={<Ghlist />} />
        <Route path="/marvel" element={<Mvlist />} />
        <Route path="/moble" element={<Mblist />} />
        <Route path="/myreview" element={<MyReview />} />
        <Route path="/mycoupon" element={<MyCoupon />} />
        <Route path="/getcoupon" element={<GetCoupon/>}/>
        <Route path="/getnotice" element={<GetNotice/>}/>
        <Route path="sanrio/pomproduct" element={<PomProduct />} />
        <Route path="sanrio/cinnaproduct" element={<CinnaProduct />} />
        <Route path="/admin" element={<Dashboard />} />
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
      </Routes>
    </BrowserRouter>
  );
}
export default App;
