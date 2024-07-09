import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faX
} from "@fortawesome/free-solid-svg-icons";
import './myorderdetail.css';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

const MyOrderDetail = ({ setOpen, orderId }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [detailData, setDetailData] = useState();


    // x 버튼 클릭했을 때 모달 없앰
    const xClick = () => {
        setOpen(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${apiUrl}/order_items/orders/${orderId}`, {}, { headers: { 'auth-token': user.token }, withCredentials: true });
                setDetailData(res.data);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [])

    // 주문일자 날짜 포맷
    const formatDate = (orderDate) => {
        let result = new Date(orderDate);
        return result.toISOString().split('T')[0];
    }

    return (
        <div className="myorderdetail">
            <div className='myorderdetail-container'>
                <div className='myorderdetail-top'>
                    <FontAwesomeIcon icon={faX} className="myorderdetail-icon" onClick={() => xClick()} />
                </div>
                <h1 className="myorderdetail-h1">주문 상세</h1>
                <div className='myorderdetail-middle'>
                    <table className='myorderdetail-table'>
                        <colgroup>
                            <col style={{ width: '20%' }} />
                            <col style={{ width: '60%' }} />
                            <col style={{ width: '20%' }} />
                        </colgroup>
                        <tr className='myorderdetail-title-tr'>
                            <th className='myorderdetail-th'>주문일/주문 번호</th>
                            <th className='myorderdetail-th'>상품 정보</th>
                            <th className='myorderdetail-th'>금액</th>
                        </tr>
                        {!detailData ? (
                            <tr className="writablereview-not"><td colSpan="5">정보를 가져오는 데에 실패했습니다.</td></tr>
                        ) : (
                            detailData.map((detail, index) => (
                                <tr className="myorderdetail-tr">
                                    <td className='myorderdetail-td'>
                                        <div className='myorderdetail-date'>
                                            <span className='myorderdetail-span'>{formatDate(detail.order_date)}</span>
                                            <span className='myorderdetail-span'>{detail.waybill_number}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='myorderdetail-row'>
                                            <div><img src={detail.url} className='myorderdetail-image'></img></div>
                                            <div className='myorder-row-right'>
                                                <p className='myorder-title'>{detail.name}</p>
                                                <a className='myorder-detail'>수량: {detail.quantity}개</a>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='myorder-td'>
                                        <div className='myorder-quantity'>
                                            <p className='myorder-detail'>{detail.discounted_price * detail.quantity}원</p>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}


                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyOrderDetail;