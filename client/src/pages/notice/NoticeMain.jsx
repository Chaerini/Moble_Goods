import React,{useState} from "react";
import NoticeList from "./NoticeList";
class NoticeMain extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            title:false,
            content:false,
        };
    }
    home = (e) =>{
        window.location.replace("/");
    };
    onChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value,
        });
        console.log(this.state.title + this.state.content)
    };
    onSubmit  = (e) =>{
        e.preventDefault();
        const data = {
            title: this.state.title,
            content:this.state.content,
        };
        let length = this.state.content;

        if(this.state.title == "" || this.state.content == ""){
            alert("제목이나 내용을 입력해 주세요");
        }else{
            fetch("api/notice",{
                method:"post",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(data),
            });
            alert("제출되었습니다")
        }
};
   render(){
    return(
    <div>
        <h1 align="center">공지사항</h1>
    <div>
       <span>제목</span>
       <input type="text" 
              name="title" 
              placeholder="제목" 
              onChange={this.onChange} 
            />
        </div>
    <div>
        <span>내용</span>
        <div>
        <input
            type="text"
            name="content"
            placeholder="내용"
            onChange={this.onChange}
            />
        </div>
    </div>
        <button className="notice-btn" onClick={this.onSubmit}>공지사항 등록하기</button>
        <NoticeList/>
</div>
        );
    }
}
export default NoticeMain;