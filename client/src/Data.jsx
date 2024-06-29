import NoticeList from "./pages/notice/NoticeList";

const noticeList = [
    {
        "no":1,
        "title":"첫번째 게시글입니다",
        "content":"첫번째 게시글 내용입니다",
        "createDate":"2024-06-25"
    },
    {
        "no":2,
        "title":"두번째 게시글입니다",
        "content":"두번째 게시글 내용입니다",
        "createDate":"2024-06-26"

    },
];
const getNoticeByNo = no => {
    const array = NoticeList.filter(x=> x.no == no);
    if(array.length == 1){
        return array[0];
    }
    return null;
}
export{
    noticeList,
    getNoticeByNo   
}