import logo from './logo.svg';
import './App.css';
import { useCallback, useState } from "react";
import{
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import NoticeMain from './pages/notice/NoticeMain';
import Cart from './pages/cart/Cart';

function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<NoticeMain/>}/>
      <Route path='/Cart' element={<Cart/>}/>
    </Routes>
    </BrowserRouter>
  )
}
export default App;
