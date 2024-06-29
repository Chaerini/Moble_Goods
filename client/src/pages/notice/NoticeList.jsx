import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import CommonTable from "../../component/table/CommonTable";
import CommonTableColumn from "../../component/table/CommonTableColumn";
import CommonTableRow from "../../component/table/CommonTableRow";
import { Link } from "react-router-dom";
import { noticeList } from "../../Data";
const NoticeList= () =>{
    const [dataList,setDataList] = useState([]);
    useEffect(() =>{
        setDataList(noticeList);
    },[])
    return(
    <>
        <CommonTable headersName={['글번호','제목','등록일']}>
            {
                dataList? dataList.map((item,index) => {
                    return(
                        <CommonTableRow key={index}>
                            <CommonTableColumn>{item.no}</CommonTableColumn>
                            <CommonTableColumn>
                                <Link to={`/noticeView/${item.no}`}>{item.title}</Link>
                            </CommonTableColumn>
                            <CommonTableColumn>{item.createDate}</CommonTableColumn>
                        </CommonTableRow>
                    )
                }):""
            }
</CommonTable>
</>
    )
}
export default NoticeList;