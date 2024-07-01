import React, { useState,useRef,useEffect } from "react"
import "./Modal.css";
import "./Notice.css";
import axios from "axios";
import CommonTable from "../../component/table/CommonTable";
import CommonTableColumn from "../../component/table/CommonTableColumn";
import CommonTableRow from "../../component/table/CommonTableRow";
const Modal = () =>{
    const [data, setData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef();
    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL;
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/products`);
                setData(response.data);
                console.log(apiUrl);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);
    return(
        <>
        <div className="btn-wrapper">
            <button className="modal-btn" onClick={()=>setModalOpen(true)}>
                상품리스트 보기
            </button>
        </div>
        {
            modalOpen &&
            <div className="modal-container" ref={modalBackground} onClick={e => {
                if(e.target == modalBackground.current){
                    setModalOpen(false);
                }
            }}>
            <div className="CommonTable">
        <CommonTable headersName={[]}>
        <ul>
            <h2>상품</h2>
            <thead>
            <tr>
                <th>번호</th>
                <th>이름</th>
                <th>수량</th>
                <th>가격</th>
                <th>할인율</th>
                <th>할인된 가격</th>
                <th>날짜</th>
            </tr>
        </thead>
                {data.map((item, index) => (
                    <CommonTableRow key={index}>
                        <CommonTableColumn>{item.id}</CommonTableColumn>
                        <CommonTableColumn>{item.name}</CommonTableColumn>
                        <CommonTableColumn>{item.quantity}</CommonTableColumn>
                        <CommonTableColumn>{item.price}</CommonTableColumn>
                        <CommonTableColumn>{item.discount_rate}</CommonTableColumn>
                        <CommonTableColumn>{item.discounted_price}</CommonTableColumn>
                        <CommonTableColumn>{item.date}</CommonTableColumn>
                    </CommonTableRow>
                ))}
            </ul>
            <button className="modal-btn" onClick={()=>setModalOpen(false)}>
            모달 닫기
            </button>
            </CommonTable>
            </div>    
        </div>
        }
        </>
    )
}
export default Modal;