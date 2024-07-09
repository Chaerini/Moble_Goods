import React, { useState, useEffect } from "react";
import axios from "axios";
import useFetch from "../../../hooks/useFetch";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "./orderManage.css";

const OrderManage = () => {
  // API URL 설정
  const apiUrl = process.env.REACT_APP_API_URL;
  const { data, loading, error } = useFetch(`${apiUrl}/orders/admin`);

  // 검색 필터 상태
  const [selectedOrders, setSelectedOrders] = useState([]); // 선택 항목
  const [searchOrderNumber, setSearchOrderNumber] = useState(""); // 검색 - 주문번호
  const [filteredData, setFilteredData] = useState(null); //검색데이터
  const [orderStatus, setOrderStatus] = useState("전체"); // 검색 - 주문상태
  const [paymentMethod, setPaymentMethod] = useState("전체"); // 검색 - 결제방법
  const [orderDateRange, setOrderDateRange] = useState([null, null]); //검색 - 주문일시
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지
  const itemsPerPage = 15;

  // 로딩 상태 처리
  if (loading) return <div>로딩 중...</div>;
  if (error)
    return <div>데이터를 가져오는 중 오류가 발생했습니다: {error.message}</div>;

  const orderList = Array.isArray(data) ? data : data?.rows || [];
  if (!Array.isArray(orderList))
    return <div>예상치 못한 데이터 형식입니다</div>;

  // 날짜 형식 변경
  const formatKoreanDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  };

  //// 페이지 넘기기
  let dataToDisplay = filteredData || orderList;

  // 최신순 정렬
  dataToDisplay = dataToDisplay.sort(
    (a, b) => new Date(b.order_date || 0) - new Date(a.order_date || 0)
  );

  const uniqueOrderCount = new Set(dataToDisplay.map((item) => item.order_id))
    .size;

  const groupedItems = dataToDisplay.reduce((acc, item) => {
    if (!acc[item.order_id]) acc[item.order_id] = [];
    acc[item.order_id].push(item);
    return acc;
  }, {});

  const groupedOrdersArray = Object.values(groupedItems);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = groupedOrdersArray.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(groupedOrdersArray.length / itemsPerPage);

  const handleClick = (pageNumber) => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={`orderManage-page-num ${
            currentPage === i ? "active" : ""
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  /////////////////////////////////////////////////////////////////////////////
  // 주문내역 삭제
  const handleDeleteOrders = async () => {
    console.log("오더매니지 주문내역삭제 들어옴");
    try {
      // 선택된 주문 삭제
      for (const order_id of selectedOrders) {
        // 주문 및 관련된 order_items 삭제
        await axios.delete(`${apiUrl}/orders/admin/${order_id}`);
      }

      //삭제 후 필터링된 데이터를 갱신
      setFilteredData((prevData) => {
        const updatedData = (prevData || orderList).filter(
          (order) => !selectedOrders.includes(order.order_id)
        );
        return updatedData;
      });

      // 선택된 주문 목록 초기화
      setSelectedOrders([]);
    } catch (err) {
      console.log(err);
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////
  // 검색 필터 상태 업데이트
  const handleSearchChange = (e) => setSearchOrderNumber(e.target.value);
  const handleStatusChange = (e) => setOrderStatus(e.target.value);
  const handlePaymentMethodChange = (e) => setPaymentMethod(e.target.value);

  // 체크박스 선택 상태 업데이트
  const handleCheckboxChange = (orderId) => {
    setSelectedOrders((prevSelected) => {
      if (prevSelected.includes(orderId)) {
        return prevSelected.filter((id) => id !== orderId);
      } else {
        return [...prevSelected, orderId];
      }
    });
  };

  // 검색 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    let filtered = orderList;

    if (searchOrderNumber) {
      filtered = filtered.filter((order) =>
        order.order_id.toString().includes(searchOrderNumber)
      );
    }

    if (orderStatus !== "전체") {
      filtered = filtered.filter(
        (order) => order.delivery_status === orderStatus
      );
    }

    if (paymentMethod !== "전체") {
      filtered = filtered.filter(
        (order) => order.payment_method === paymentMethod
      );
    }

    const [startDate, endDate] = orderDateRange;
    if (startDate && endDate) {
      const TimeOfEndDate = new Date(endDate);

      //endDate 시간 설정
      TimeOfEndDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.order_date);
        return orderDate >= startDate && orderDate <= TimeOfEndDate;
      });
    }

    setFilteredData(filtered);
  };

  return (
    <div className="orderManage-wrapper">
      <div className="orderManage-content-wrapper">
        <div className="orderManage-header">
          <div className="orderManage-title">주문 관리</div>
        </div>
        <div className="orderManager-main-contents">
          <div className="orderManage-select-container">
            <form onSubmit={handleSubmit}>
              <div className="orderManage-select-box">
                <label
                  htmlFor="orderManage-orderNumber"
                  className="orderManage-select-label"
                >
                  주문 번호
                </label>
                <input
                  id="orderManage-orderNumber"
                  className="orderManage-orderNumber-search-input"
                  type="text"
                  value={searchOrderNumber}
                  onChange={handleSearchChange}
                />
                <div>
                  <button type="submit" className="orderManage-search-btn">
                    검색
                  </button>
                </div>
              </div>

              <div className="orderManage-select-box">
                <label className="orderManage-select-label">주문 상태</label>
                <div className="orderManage-select-item">
                  {["전체", "주문완료", "결제완료", "배송중", "배송완료"].map(
                    (status) => (
                      <label key={status}>
                        <input
                          type="radio"
                          name="orderManage-orderStatus"
                          className="orderManage-check"
                          value={status}
                          checked={orderStatus === status}
                          onChange={handleStatusChange}
                        />
                        {status}
                      </label>
                    )
                  )}
                </div>
              </div>

              <div className="orderManage-select-box">
                <label className="orderManage-select-label">결제 수단</label>
                <div className="orderManage-select-item">
                  {["전체", "신용카드", "실시간 계좌이체", "휴대폰결제"].map(
                    (method) => (
                      <label key={method}>
                        <input
                          type="radio"
                          name="payment-method"
                          className="orderManage-check"
                          value={method}
                          checked={paymentMethod === method}
                          onChange={handlePaymentMethodChange}
                        />
                        {method}
                      </label>
                    )
                  )}
                </div>
              </div>

              <div className="orderManage-select-box">
                <label className="orderManage-select-label">조회 기간</label>
                <div className="orderManage-select-item">
                  <DatePicker
                    className="orderManage-datePicker-wrapper"
                    selectsRange={true}
                    startDate={orderDateRange[0]}
                    endDate={orderDateRange[1]}
                    onChange={(update) => setOrderDateRange(update)}
                    isClearable={true}
                    dateFormat="yyyy/MM/dd"
                    placeholderText="시작일      -      종료일"
                  />
                </div>
              </div>
              <div className="orderManage-search-last-btn-box">
                <button type="submit" className="orderManage-search-last-btn">
                  검색
                </button>
              </div>
            </form>
          </div>

          <div className="orderManage-table-container">
            <div className="orderManage-table-con">
              <div className="orderManage-top">
                <div className="orderManage-table-summary">
                  검색 결과: {uniqueOrderCount} 건
                </div>
                <div>
                  <button
                    className="orderManage-status-delete-btn"
                    onClick={handleDeleteOrders}
                    disabled={selectedOrders.length === 0}
                  >
                    주문 삭제
                  </button>
                </div>
              </div>
              <div className="orderManage-table-box">
                <table className="orderManage-table">
                  <colgroup>
                    <col style={{ width: "4%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "7%" }} />
                    <col style={{ width: "7%" }} />
                    <col style={{ width: "7%" }} />
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "4%" }} />
                  </colgroup>
                  <thead className="orderManage-table-head">
                    <tr>
                      <th className="orderManage-th">번호</th>
                      <th className="orderManage-th">주문번호</th>
                      <th className="orderManage-th">주문자명</th>
                      <th className="orderManage-th">상품명</th>
                      <th className="orderManage-th">주문수량</th>
                      <th className="orderManage-th">결제금액(원)</th>
                      <th className="orderManage-th">배송상태</th>
                      <th className="orderManage-th">운송장번호</th>
                      <th className="orderManage-th">선택</th>
                    </tr>
                  </thead>
                  <tbody className="orderManage-table-body">
                    {dataToDisplay.length === 0 ? (
                      <tr>
                        <td
                          colSpan="8"
                          className="orderManage-noResults"
                          style={{
                            height: "270px",
                            border: "none",
                            fontSize: "14px",
                          }}
                        >
                          검색결과가 없습니다.
                        </td>
                      </tr>
                    ) : (
                      currentItems.map((order, orderIndex) => {
                        const items = order;
                        return items.map((item, index) => (
                          <tr key={item.orderitem_id}>
                            {index === 0 && (
                              <td
                                rowSpan={items.length}
                                className="orderManage-td"
                              >
                                {indexOfFirstItem + orderIndex + 1}
                              </td>
                            )}
                            {index === 0 && (
                              <td
                                rowSpan={items.length}
                                className="orderManage-td"
                              >
                                {formatKoreanDate(item.order_date) || ""} -{" "}
                                {item.order_id || ""}
                              </td>
                            )}
                            {index === 0 && (
                              <td
                                rowSpan={items.length}
                                className="orderManage-td"
                              >
                                {item.username || ""}
                              </td>
                            )}
                            <td className="orderManage-td">
                              {item.product_name || ""}
                            </td>
                            <td className="orderManage-td">
                              {item.quantity || ""}
                            </td>
                            {index === 0 && (
                              <td
                                rowSpan={items.length}
                                className="orderManage-td"
                              >
                                {item.total || ""}
                              </td>
                            )}
                            {index === 0 && (
                              <td
                                rowSpan={items.length}
                                className="orderManage-td"
                              >
                                {item.delivery_status || ""}
                              </td>
                            )}
                            {index === 0 && (
                              <td
                                rowSpan={items.length}
                                className="orderManage-td"
                              >
                                {item.waybill_number || ""}
                              </td>
                            )}
                            {index === 0 && (
                              <td
                                rowSpan={items.length}
                                className="orderManage-td"
                              >
                                <input
                                  type="checkbox"
                                  className="orderManage-checkbox"
                                  onChange={() =>
                                    handleCheckboxChange(item.order_id)
                                  }
                                  checked={selectedOrders.includes(
                                    item.order_id
                                  )}
                                />
                              </td>
                            )}
                          </tr>
                        ));
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="orderManage-page-btn-box">
              <button
                className="orderManage-page-btn"
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage === 1}
              >
                이전
              </button>
              {renderPageNumbers()}
              <button
                className="orderManage-page-btn"
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                다음
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManage;
