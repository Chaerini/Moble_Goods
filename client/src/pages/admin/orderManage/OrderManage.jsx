import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import useFetch from "../../../hooks/useFetch";
import "./orderManage.css";

const OrderManage = () => {
  // 주문 내역 전체 조회
  // const apiUrl = process.env.REACT_APP_API_URL;
  const apiUrl = 'http://localhost:8080/api'
  const { data, loading, error } = useFetch(`${apiUrl}/order`);
  console.log("data : ", data);

  return (
    <div className="orderManage-wrapper">
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
                <div>
                  <button type="submit" className="orderManage-search-btn">
                    검색
                  </button>
                </div>
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
                  <select className="orderManage-select-date">
                    <option>전체</option>
                    <option>오늘</option>
                    <option>어제</option>
                    <option>지난주</option>
                    <option>지난달</option>
                  </select>
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
                  검색 결과 : 0 건
                </div>
                <div>
                  <button className="orderManage-status-change-btn">
                    선택수정
                  </button>
                </div>
              </div>
              <div className="orderManage-table-box">
                <table style={{ width: "100%" }} className="orderManage-table">
                  <thead className="orderManage-table-head">
                    <tr>
                      <th>주문번호</th>
                      <th>주문일시</th>
                      <th>상품명</th>
                      <th>주문자명</th>
                      <th>결제금액</th>
                      <th>주문수량</th>
                      <th>배송상태</th>
                      <th>취소</th>
                    </tr>
                  </thead>
                  <tbody className="orderManage-table-body">
                    <tr>
                      <th>
                        <a href="#" className="orderManage-table-item-orderNum">
                          주문번호
                        </a>
                      </th>
                      <th>주문일시</th>
                      <th>상품명</th>
                      <th>주문자명</th>
                      <th>결제금액</th>
                      <th>주문수량</th>
                      <th>배송상태</th>
                      <th>취소</th>
                    </tr>
                  </tbody>
                  <tbody className="orderManage-table-body">
                    <tr>
                      <th>
                        <a href="#" className="orderManage-table-item-orderNum">
                          주문번호
                        </a>
                      </th>
                      <th>주문일시</th>
                      <th>상품명</th>
                      <th>주문자명</th>
                      <th>결제금액</th>
                      <th>주문수량</th>
                      <th>배송상태</th>
                      <th>취소</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="orderManage-page-btn-box">
              <button className="orderManage-page-btn">이전</button>
              <button className="orderManage-page-num">1</button>
              <button className="orderManage-page-btn">다음</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManage;
