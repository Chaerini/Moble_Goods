import React, { useState, useEffect } from "react";
import "./orderManageModal.css";

const OrderManageModal = ({ isOpen, onClose, orderData }) => {
  useEffect(() => {
    const labels = document.querySelectorAll(".orderManage-modal-label");
    labels.forEach((label) => {
      const labelWidth = label.offsetWidth;
      const textLength = label.textContent.length * 1.2;
      const letterSpacing = (labelWidth - textLength * 13) / (textLength - 1);
      label.style.letterSpacing = `${letterSpacing}px`;
    });
  }, []);

  if (!isOpen) {
    return null;
  }

  const handleUpdate = () => {
    const updatedOrder = {
      ...orderData,
      delivery_status: orderData.delivery_status,
    };
    console.log("Updated Order:", updatedOrder);
    onClose();
  };

  const handleDelete = () => {
    console.log(`Order with ID ${orderData.order_id} has been deleted.`);
    onClose();
  };

  return (
    <div className="orderManage-modal-wrapper">
      <div className="orderManage-modal-content">
        <h2>주문 내역 수정</h2>
        <div className="orderManage-modal-input-data-container">
          <div className="orderManage-modal-input-data-box">
            <label className="orderManage-modal-label">주문번호</label>
            <input
              className="orderManage-modal-input"
              type="text"
              value={orderData.order_id}
              readOnly
            />
          </div>
          <div className="orderManage-modal-input-data-box">
            <label className="orderManage-modal-label">주문자명</label>
            <input
              className="orderManage-modal-input"
              type="text"
              value={orderData.username}
              readOnly
            />
          </div>
          <div className="orderManage-modal-input-data-box">
            <label className="orderManage-modal-label">상품명</label>
            <input
              className="orderManage-modal-input"
              type="text"
              value={orderData.product_name}
              readOnly
            />
          </div>
          <div className="orderManage-modal-input-data-box">
            <label className="orderManage-modal-label">주문수량</label>
            <input
              className="orderManage-modal-input"
              type="text"
              value={orderData.quantity}
              readOnly
            />
          </div>
          <div className="orderManage-modal-input-data-box">
            <label className="orderManage-modal-label">결제금액</label>
            <input
              className="orderManage-modal-input"
              type="text"
              value={orderData.total}
              readOnly
            />
          </div>
          <div className="orderManage-modal-input-data-box">
            <label className="orderManage-modal-label">배송상태</label>
            <div className="orderManage-modal-input-radioCon">
              {["주문완료", "결제완료", "배송중", "배송완료"].map((status) => (
                <label
                  className="orderManage-modal-input-radioBox"
                  key={status}
                >
                  <input
                    type="radio"
                    name="delivery_status"
                    className="orderManage-modal-input radio"
                    value={status}
                    checked={orderData.delivery_status === status}
                    onChange={(e) =>
                      (orderData.delivery_status = e.target.value)
                    }
                  />
                  {status}
                </label>
              ))}
            </div>
          </div>
          <div className="orderManage-modal-input-data-box">
            <label>운송장번호: </label>
            <input
              className="orderManage-modal-input"
              type="text"
              value={orderData.waybill_number}
              readOnly
            />
          </div>
        </div>
        <div className="orderManage-modal-btn-box">
          <button className="orderManage-modal-btn del" onClick={handleDelete}>
            삭제
          </button>
          <button
            className="orderManage-modal-btn"
            type="submit"
            onClick={handleUpdate}
          >
            저장
          </button>
          {/* <button className="orderManage-modal-btn 1" onClick={onClose}>
            닫기
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default OrderManageModal;
