import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";

const Dashboard = () => {
  // API URL 설정
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

  console.log("apiUrl: ", apiUrl);

  const [AllOrderCount, setAllOrderCount] = useState(0); //총 주문 건
  const [customerCount, setCustomerCount] = useState(0); //순고객
  const [unansweredQnA, setUnansweredQnA] = useState(0); //답변달린 Qna
  const [newCustomersToday, setNewCustomersToday] = useState(0); //신규고객
  const [todayTotalSales, setTodayTotalSales] = useState(0); //하루 매출총액
  const [todayOrderCount, setTodayOrderCount] = useState(0); //하루 주문 건수
  const [paymentCompleteCount, setPaymentCompleteCount] = useState(0); // 결제완료 건수
  const [preparingCount, setPreparingCount] = useState(0); //배송준비중 건수
  const [inTransitCount, setInTransitCount] = useState(0); //배송중 건수
  const [deliveredCount, setDeliveredCount] = useState(0); //배송완료 건수

  useEffect(() => {
    const fetchData = async () => {
      try {
        const AllOrderCount = await axios.get(`${apiUrl}/orders`);
        setAllOrderCount(AllOrderCount.data.length || 0);

        const customerCountRes = await axios.get(`${apiUrl}/users`);
        setCustomerCount(customerCountRes.data.length || 0);

        const unansweredQnARes = await axios.get(
          `${apiUrl}/asks/admin/nocomment`
        );
        console.log(
          `${apiUrl}/asks/admin/nocomment : `,
          `${apiUrl}/asks/admin/nocomment`
        );
        setUnansweredQnA(unansweredQnARes.data.length || 0);

        const newCustomersTodayRes = await axios.get(
          `${apiUrl}/users/admin/today`
        );
        console.log(
          `${apiUrl}/users/admin/today : `,
          `${apiUrl}/users/admin/today`
        );
        setNewCustomersToday(newCustomersTodayRes.data.rows.length || 0);

        const todayTotalSalesRes = await axios.get(
          `${apiUrl}/orders/admin/todaytotal`
        );
        console.log(
          `${apiUrl}/orders/admin/todaytotal : `,
          `${apiUrl}/orders/admin/todaytotal`
        );
        console.log(todayTotalSalesRes);
        setTodayTotalSales(
          todayTotalSalesRes.data.reduce(
            (sum, order) => sum + order.total,
            0
          ) || 0
        );

        const todayOrderCountRes = await axios.get(
          `${apiUrl}/orders/admin/todayorder`
        );
        console.log(
          `${apiUrl}/orders/admin/todayorder : `,
          `${apiUrl}/orders/admin/todayorder`
        );
        setTodayOrderCount(todayOrderCountRes.data.length || 0);

        const paymentCompleteRes = await axios.get(
          `${apiUrl}/orders/admin/paymentcomplete`
        );
        console.log(
          `${apiUrl}/orders/admin/paymentcomplete : `,
          `${apiUrl}/orders/admin/paymentcomplete`
        );
        setPaymentCompleteCount(paymentCompleteRes.data.length || 0);

        const preparingRes = await axios.get(
          `${apiUrl}/orders/admin/preparing`
        );
        console.log(
          `${apiUrl}/orders/admin/preparing : `,
          `${apiUrl}/orders/admin/preparing`
        );
        setPreparingCount(preparingRes.data.length || 0);

        const inTransitRes = await axios.get(`${apiUrl}/orders/admin/transit`);
        console.log(
          `${apiUrl}/orders/admin/transit : `,
          `${apiUrl}/orders/admin/transit`
        );
        setInTransitCount(inTransitRes.data.length || 0);

        const deliveredRes = await axios.get(
          `${apiUrl}/orders/admin/delivered`
        );
        console.log(
          `${apiUrl}/orders/admin/delivered : `,
          `${apiUrl}/orders/admin/delivered`
        );
        setDeliveredCount(deliveredRes.data.length || 0);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <div className="dashboard">
      <div className="dashboard-main-wrapper">
        <div className="dashboard-main-content">
          {/* 카드 1 */}
          <div className="dashboard-card-wrapper-1">
            <div className="dashboard-card-bg-two">
              <div className="dashboard-header-box-two">
                <div className="dashboard-header-two">To do</div>
              </div>

              <div className="dashboard-card-two">
                <div className="dashboard-card-bg-two red">
                  <p className="dashboard-title-two">배송 준비중</p>
                  <p className="dashboard-value-two">{preparingCount} 건</p>
                </div>
              </div>
              <div className="dashboard-card-two">
                <div className="dashboard-card-bg-two red">
                  <p className="dashboard-title-two">1:1 문의 미답변</p>
                  <p className="dashboard-value-two">{unansweredQnA}건</p>
                </div>
              </div>
            </div>
          </div>

          {/* 카드 2 */}
          <div className="dashboard-card-wrapper-2">
            <div className="dashboard-card-bg">
              <div className="dashboard-header-box">
                <div className="dashboard-header">오늘 날짜 현황</div>
              </div>

              <div className="dashboard-card-contents-wrapper">
                <div className="dashboard-card">
                  <div className="dashboard-card-bg purple">
                    <p className="dashboard-title">신규 고객</p>
                    <p className="dashboard-value">{newCustomersToday} 명</p>
                  </div>
                </div>
                <div className="dashboard-card">
                  <div className="dashboard-card-bg red">
                    <p className="dashboard-title">총 매출</p>
                    <p className="dashboard-value">{todayTotalSales} 원</p>
                  </div>
                </div>
                <div className="dashboard-card">
                  <div className="dashboard-card-bg yellow">
                    <p className="dashboard-title">총 주문</p>
                    <p className="dashboard-value">{todayOrderCount} 건</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 카드 3 */}
          <div className="dashboard-card-wrapper-2">
            <div className="dashboard-card-bg">
              <div className="dashboard-header-box">
                <div className="dashboard-header">배송 상태 (주간)</div>
              </div>

              <div className="dashboard-card-contents-wrapper">
                <div className="dashboard-card">
                  <div className="dashboard-card-bg gray">
                    <p className="dashboard-title">결제완료</p>
                    <p className="dashboard-value">{paymentCompleteCount} 건</p>
                  </div>
                </div>
                <div className="dashboard-card">
                  <div className="dashboard-card-bg gray">
                    <p className="dashboard-title">배송준비중</p>
                    <p className="dashboard-value">{preparingCount} 건</p>
                  </div>
                </div>
                <div className="dashboard-card">
                  <div className="dashboard-card-bg gray">
                    <p className="dashboard-title">배송중</p>
                    <p className="dashboard-value">{inTransitCount} 건</p>
                  </div>
                </div>
                <div className="dashboard-card">
                  <div className="dashboard-card-bg gray">
                    <p className="dashboard-title">배송완료</p>
                    <p className="dashboard-value">{deliveredCount} 건</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 카드 4 */}
          <div className="dashboard-card-wrapper-1">
            <div className="dashboard-card-bg-two">
              <div className="dashboard-header-box-two">
                <div className="dashboard-header-two">고객</div>
              </div>

              <div className="dashboard-card-two">
                <div className="dashboard-card-bg-two gray">
                  <p className="dashboard-title-two">미답변</p>
                  <p className="dashboard-value-two">{unansweredQnA} 건</p>
                </div>
              </div>
              <div className="dashboard-card-two">
                <div className="dashboard-card-bg-two gray">
                  <p className="dashboard-title-two">
                    총 주문 건 {AllOrderCount} 건 중
                  </p>
                  <p className="dashboard-value-two">
                    {todayOrderCount - unansweredQnA} 건 리뷰 작성
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
