import React,{useState} from "react";
import NoticeList from "./NoticeList";
function NoticeMain(props){
const [notice,setNotice] = useState("");
const handleChangeNotice = (event) =>{
    setNotice(event.target.value);
    console.log(event.target.value)
}
const handleSubmit = (event) =>{
    console.log(`공지사항:${notice}`)
    event.preventDefault();
};
    return(
        <form onSubmit={handleSubmit}>
        <h1 align="center">공지사항</h1>
       <label>등록:<input type="text" value={notice} onChange={handleChangeNotice} className="h1"/></label>
        <button className="notice-btn" type="submit">공지사항 등록하기</button>
        <NoticeList/>
        </form>
    )
}
export default NoticeMain;