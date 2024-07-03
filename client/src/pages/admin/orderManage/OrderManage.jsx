import React from "react";
import AdminHeader from "../adminHeader/AdminHeader";
import AdminSidebar from "../adminSidebar/AdminSidebar";
import "./orderManage.css";

const OrderManage = () => {
  return (
    <div className="orderManage-wrapper">
      <AdminSidebar />
      <AdminHeader />
      <div className="orderManage-main-content">
        <div className="orderManage-title">주문내역</div>

        <div className="orderManage-select-cate-container">
          <div className="orderManage-search-box">
            <label htmlFor="orderManage-orderNumber">주문번호 : </label>
            <input
              id="orderManage-orderNumber"
              className="orderManage-orderNumber-search-input"
              type="text"
            />
            <button className="orderManage-search-btn">검색</button>
          </div>
          <div className="orderManage-order-status-box">
            <label>주문 상태 : </label>
            <input
              type="radio"
              name="orderManage-orderStatus"
              className="orderManage-orderStatus"
              value="전체"
            ></input>
            전체
            <input
              type="radio"
              name="orderManage-orderStatus"
              className="orderManage-orderStatus"
              value="주문"
            ></input>
            주문
            <input
              type="radio"
              name="orderManage-orderStatus"
              className="orderManage-orderStatus"
              value="입금"
            ></input>
            입금
            <input
              type="radio"
              name="orderManage-orderStatus"
              className="orderManage-orderStatus"
              value="배송"
            ></input>
            배송
            <input
              type="radio"
              name="orderManage-orderStatus"
              className="orderManage-orderStatus"
              value="완료"
            ></input>
            완료
            <input
              type="radio"
              name="orderManage-orderStatus"
              className="orderManage-orderStatus"
              value="부분취소"
            ></input>
            부분취소
          </div>
          <div className="orderManage-order-payment-box">
            <label>결제 수단 : </label>
            <input type="radio" name="payment-method" value="전체" /> 전체
            <input type="radio" name="payment-method" value="카드" /> 카드
            <input type="radio" name="payment-method" value="무통장" /> 무통장
            <input type="radio" name="payment-method" value="휴대폰" /> 휴대폰
            <input type="radio" name="payment-method" value="PG간편결제" />
            PG간편결제
            <input type="radio" name="payment-method" value="KAKAOPAY" />
            KAKAOPAY
          </div>
          <div className="orderManage-order-extra-options-box">
            <label>기타선택 : </label>
            <input type="checkbox" name="extra-options" value="미입금" />
            미입금
            <input type="checkbox" name="extra-options" value="반품" /> 반품
            <input type="checkbox" name="extra-options" value="중단" /> 중단
            <input type="checkbox" name="extra-options" value="포인트주문" />
            포인트주문
            <input type="checkbox" name="extra-options" value="쿠폰주문" />
            쿠폰주문
            <input type="checkbox" name="extra-options" value="무료" /> 무료
          </div>
          <div>
            <label>주문일자 : </label>
            <select>
              <option>전체</option>
              <option>오늘</option>
              <option>어제</option>
              <option>지난주</option>
              <option>지난달</option>
            </select>
            <button>검색</button>
          </div>
        </div>

        <table className="orderManage-table">
          <thead className="orderManage-table-head">
            <tr>
              <th>주문상태</th>
              <th>결제수단</th>
              <th>주문번호</th>
              <th>주문자</th>
              <th>연락처</th>
              <th>받는분</th>
              <th>누적주문수</th>
              <th>주문합계</th>
              <th>입금합계</th>
              <th>주문주소</th>
              <th>쿠폰</th>
              <th>미수금</th>
              <th>보기</th>
            </tr>
          </thead>
          <tbody className="orderManage-table-body">
            <tr>
              <td>주문상태</td>
              <td>결제수단</td>
              <td>주문번호</td>
              <td>주문자</td>
              <td>연락처</td>
              <td>받는분</td>
              <td>누적주문수</td>
              <td>주문합계</td>
              <td>입금합계</td>
              <td>주문주소</td>
              <td>쿠폰</td>
              <td>미수금</td>
              <td>보기</td>
            </tr>
          </tbody>
        </table>
        <div className="orderManage-table-summary">
          <p>합계:0</p>
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
