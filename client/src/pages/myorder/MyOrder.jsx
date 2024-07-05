import Navbar from '../../component/navbar/navbar';
import Header from '../../component/header/header';
import Footer from '../../component/footer/footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleExclamation
} from "@fortawesome/free-solid-svg-icons";
import './myorder.css';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';

const MyOrder = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    console.log(user);

    const [orderData, setOrderData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${apiUrl}/order/user/${user.id}`, {}, { headers: { 'auth-token': user.token }, withCredentials: true });
                setOrderData(res.data);
                console.log(res.data);
            } catch (err) {
                alert("주문 내역을 가져오는 데 실패했습니다. 다시 시도해주세요.");
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
        <>
            <Header />
            <Navbar />
            <div className='myorder'>
                <div className='myorder-container'>
                    <h1 className='myorder-h1'>주문 · 배송 내역</h1>
                    <div className='myorder-delivery-wrap'>
                        <div className='myorder-left'>
                            <span className='myorder-delivery-title'>기간별 조회</span>
                            <span className='myorder-left-button'>
                                <button className='myorder-button-white-click'>6개월</button>
                                <button className='myorder-button-white'>12개월</button>
                                <button className='myorder-button-white'>24개월</button>
                            </span>
                        </div>
                        <div className='myorder-right'>
                            <span className='myorder-delivery-title'>직접 입력 조회</span>
                            <input type='date' className='myorder-input'></input>
                            <span className='myorder--'>-</span>
                            <input type='date' className='myorder-input'></input>
                            <button className='myorder-button-black'>조회</button>
                        </div>
                    </div>
                    <div className='myorder-middle'>
                        <div className='myorder-info'>
                            <FontAwesomeIcon icon={faCircleExclamation} className='myorder-icon' />
                            <span>주문 취소는 결제 완료 후 [주문취소] 버튼을 이용해 가능합니다.</span>
                        </div>
                        <table className='myorder-table'>
                            <colgroup>
                                <col style={{ width: '20%' }} />
                                <col style={{ width: '40%' }} />
                                <col style={{ width: '15%' }} />
                                <col style={{ width: '15%' }} />
                                <col style={{ width: '15%' }} />
                            </colgroup>
                            <tr className='myorder-title-tr'>
                                <th className='myorder-th'>주문일/주문 번호</th>
                                <th className='myorder-th'>상품 정보</th>
                                <th className='myorder-th'>수량/금액</th>
                                <th className='myorder-th'>진행상태</th>
                                <th className='myorder-th'>주문취소</th>
                            </tr>
                            {(!orderData || orderData.length <= 0) ? (
                                <tr className="writablereview-not"><td colSpan="5">작성 가능한 리뷰가 없습니다.</td></tr>
                            ) : (
                                orderData.map((order, index) => (
                                    <>
                                        <tr className='myorder-tr'>
                                            <td className='myorder-td'>
                                                <div className='myorder-date'>
                                                    <span className='myorder-span'>{formatDate(order.order_date)}</span>
                                                    <span className='myorder-span'>{order.waybill_number}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='myorder-row'>
                                                    <div><img src={`${process.env.PUBLIC_URL}/logo192.png`} className='myorder-image'></img></div>
                                                    <div className='myorder-row-right'>
                                                        <p className='myorder-title'>{order.name} 외 1건</p>
                                                        <a className='myorder-detail'>주문 상세</a>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='myorder-td'>
                                                <div className='myorder-quantity'>
                                                    <p className='myorder-detail'>{order.total}원</p>
                                                </div>
                                            </td>
                                            <td className='myorder-td'>
                                                <p className='myorder-status'>{order.delivery_status}</p>
                                            </td>
                                            <td className='myorder-td'>
                                                <button className='myorder-button'>주문취소</button>
                                            </td>
                                        </tr>
                                    </>
                                ))
                            )}


                        </table>
                    </div>
                    <div className='myorder-bottom'>
                        <div className='myorder-notice'>
                            <p className='myorder-notice-top'>주문·배송 유의사항</p>
                            <p className='myorder-notice-bottom'>· 주문내역에 대해 메일 및 SMS를 발송해드립니다.</p>
                            <p className='myorder-notice-bottom'>· 무통장입금의 경우 주문한 날부터 7일 이내 입금확인이 되어야 주문이 취소되지 않습니다. 배송조회는 상품이 출고 된 날의 익일 오전부터 가능합니다.</p>
                            <p className='myorder-notice-bottom'>· 출고일로부터 2일 경과후에도 배송조회가 되지 않을 경우, 고객센터로 연락 부탁드립니다.</p>
                        </div>
                        <div className='myorder-notice'>
                            <p className='myorder-notice-top'>증빙서류 발급 안내</p>
                            <p className='myorder-notice-middle'>[영수증발급]</p>
                            <p className='myorder-notice-bottom'>· 결제와 동시에 발급 되며, 출력가능합니다.</p>
                            <p className='myorder-notice-middle'>[현금영수증]</p>
                            <p className='myorder-notice-bottom'>· 무통장입금과 실시간 계좌이체 이용 시 신청 가능하며, 해당월(결제일 기준)의 말일까지 발행 가능합니다.</p>
                            <p className='myorder-notice-bottom'>· 발행은 주문시 신청된 정보로 발행되며, 신청 후 2~3일 후에 국세청 사이트에서 확인 가능합니다.</p>
                            <p className='myorder-notice-bottom'>· 현금영수증과 세금계산서는 1가지만 선택하여 발행 받으실 수 있습니다.</p>
                            <p className='myorder-notice-middle'>[세금계산서]</p>
                            <p className='myorder-notice-bottom'>· 결제일 기준으로 익월 5일까지 결제월의 세금계산서 발행이 가능합니다.</p>
                            <p className='myorder-notice-bottom'>· 현금영수증을 먼저 신청한 경우 세금계산서는 발급할 수 없습니다.</p>
                            <p className='myorder-notice-bottom'>· 무통장 입금의 경우, 세금계산서와 제출서류 다운로드는 결제완료 전에도 신청 및 다운로드가 가능합니다.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyOrder;