import React from "react";
import AdminHeader from "../adminHeader/AdminHeader";
import AdminSidebar from "../adminSidebar/AdminSidebar";
import "./orderManage.css";

const OrderManage = () => {
  return (
    <div className="orderManage-wrapper">
      <AdminSidebar />
      <AdminHeader />
      <div className="orderManage-content-wrapper">
        <div className="orderManage-header">
          <div className="orderManage-title">주문 관리</div>
        </div>
        <div className="orderManager-main-contents">
          <div className="orderManage-select-container">
            <form>
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
                />
                <button type="submit" className="orderManage-search-btn">
                  검색
                </button>
              </div>

              <div className="orderManage-select-box">
                <label className="orderManage-select-label">주문 상태</label>
                <div className="orderManage-select-item">
                  <label>
                    <input
                      type="radio"
                      name="orderManage-orderStatus"
                      className="orderManage-check"
                      value="전체"
                    />
                    전체
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="orderManage-orderStatus"
                      className="orderManage-check"
                      value="주문"
                    />
                    주문
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="orderManage-orderStatus"
                      className="orderManage-check"
                      value="입금"
                    />
                    입금
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="orderManage-orderStatus"
                      className="orderManage-check"
                      value="배송"
                    />
                    배송
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="orderManage-orderStatus"
                      className="orderManage-check"
                      value="완료"
                    />
                    완료
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="orderManage-orderStatus"
                      className="orderManage-check"
                      value="부분취소"
                    />
                    부분취소
                  </label>
                </div>
              </div>

              <div className="orderManage-select-box">
                <label className="orderManage-select-label">결제 수단</label>
                <div className="orderManage-select-item">
                  <label>
                    <input
                      type="radio"
                      name="payment-method"
                      className="orderManage-check"
                      value="전체"
                    />
                    전체
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="payment-method"
                      className="orderManage-check"
                      value="신용카드"
                    />
                    신용카드
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="payment-method"
                      value="실시간 계좌이체"
                    />
                    실시간 계좌이체
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="payment-method"
                      className="orderManage-check"
                      value="휴대폰결제"
                    />
                    휴대폰결제
                  </label>
                </div>
              </div>

              <div className="orderManage-select-box">
                <label className="orderManage-select-label">기타 선택</label>
                <div className="orderManage-select-item">
                  <label>
                    <input
                      type="checkbox"
                      name="extra-options"
                      className="orderManage-check"
                      value="미입금"
                    />
                    미입금
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="extra-options"
                      className="orderManage-check"
                      value="포인트사용"
                    />
                    포인트 사용
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="extra-options"
                      className="orderManage-check"
                      value="쿠폰사용"
                    />
                    쿠폰 사용
                  </label>
                </div>
              </div>

              <div className="orderManage-select-box">
                <label className="orderManage-select-label">주문 일자</label>
                <div className="orderManage-select-item">
                  <select>
                    <option>전체</option>
                    <option>오늘</option>
                    <option>어제</option>
                    <option>지난주</option>
                    <option>지난달</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="orderManage-search-btn">
                검색
              </button>
            </form>
          </div>
          <div className="orderManage-table-container">
            <div className="orderManage-table-summary">검색 결과 : 0 건</div>
            <table className="orderManage-table">
              <thead className="orderManage-table-head">
                <tr>
                  <th>주문 상태</th>
                  <th>결제 수단</th>
                  <th>주문 번호</th>
                  <th>주문자</th>
                  <th>연락처</th>
                  <th>받는 분</th>
                  <th>누적 주문수</th>
                  <th>주문 합계</th>
                  <th>입금 합계</th>
                  <th>주문 주소</th>
                  <th>쿠폰</th>
                  <th>미수금</th>
                  <th>보기</th>
                </tr>
              </thead>
              <tbody className="orderManage-table-body">
                <tr>
                  <td>주문 상태</td>
                  <td>결제 수단</td>
                  <td>주문 번호</td>
                  <td>주문자</td>
                  <td>연락처</td>
                  <td>받는 분</td>
                  <td>누적 주문수</td>
                  <td>주문 합계</td>
                  <td>입금 합계</td>
                  <td>주문 주소</td>
                  <td>쿠폰</td>
                  <td>미수금</td>
                  <td>보기</td>
                </tr>
              </tbody>
              <tbody className="orderManage-table-body">
                <tr>
                  <td>주문 상태</td>
                  <td>결제 수단</td>
                  <td>주문 번호</td>
                  <td>주문자</td>
                  <td>연락처</td>
                  <td>받는 분</td>
                  <td>누적 주문수</td>
                  <td>주문 합계</td>
                  <td>입금 합계</td>
                  <td>주문 주소</td>
                  <td>쿠폰</td>
                  <td>미수금</td>
                  <td>보기</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="orderManage-status-change">
          <label>주문상태 변경</label>
          <button>선택수정</button>
        </div>
      </div>
    </div>
  );
};

export default OrderManage;
