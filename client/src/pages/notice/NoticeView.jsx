import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { getNoticeByNo } from "../../Data";
import "./Notice.css";
const NoticeView = (history) => {
    const [data, setData] = useState(null);
    const { no } = useParams();
    const navigate=useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const noticeData = await getNoticeByNo(no);
            setData(noticeData);
        };
        fetchData();
    }, [no]);

    return (
        <>
            <h2 align="center">공지사항 상세정보</h2>
            <div className="notice-view-wrapper">
                {data ? (
                    <>
                        <div className="notice-view-row">
                            <label>게시글 번호</label>
                            <label>{data.no}</label>
                        </div>
                        <div className="notice-view-row">
                            <label>제목</label>
                            <label>{data.title}</label>
                        </div>
                        <div className="notice-view-row">
                            <label>작성일</label>
                            <label>{data.createDate}</label>
                        </div>
                        <div className="notice-view-row">
                            <label>내용</label>
                            <div>{data.content}</div>
                        </div>
                    </>
                ) : (
                    "해당 게시글을 찾을 수 없습니다."
                )}
                <button
                    className="notice-btn"
                    onClick={() => navigate("/")}
                >
                    목록으로 돌아가기
                </button>
            </div>
        </>
    );
};

export default NoticeView;
