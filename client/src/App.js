import { useCallback, useState } from "react";
import{
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
// import NoticeMain from './pages/notice/NoticeMain';
import Dashboard from './pages/admin/dashboard/Dashboard';


function App(){
  return(
    <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<NoticeMain/>}/> */}
      <Route path="/admin" element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
  )
}
export default App;
