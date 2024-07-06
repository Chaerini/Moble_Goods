import React, { useState } from "react";
import "./myqna.css";

// Dropdown 컴포넌트: 문의 유형과 세부 선택을 위한 드롭다운
const Dropdown = ({ label, options, onSelect, selectedOption }) => {
  const handleChange = (event) => {
    const value = event.target.value;
    onSelect(value);
  };

  return (
    <div className="myqna-dropdown-container">
      <select value={selectedOption} onChange={handleChange} className="myqna-dropdown">
        <option value="" disabled>{label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="arrow">&#9662;</span>
    </div>
  );
};

// 연락처 입력 필드 컴포넌트
const ContactInput = ({ onChange, value, placeholder }) => (
  <div className="myqna-input-field">
    <label className="myqna-input-label">연락처</label>
    <input
      type="text"
      name="contact"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="myqna-input-box"
    />
  </div>
);

// 문의 제목 입력 필드 컴포넌트
const TitleInput = ({ onChange, value, placeholder }) => (
  <div className="myqna-input-field">
    <label className="myqna-input-label">문의 제목<span className="myqna-required">*</span></label>
    <input
      type="text"
      name="title"
      value={value}
      onChange={onChange}
      maxLength={25}
      placeholder={placeholder}
      className="myqna-input-box"
    />
  </div>
);

// 문의 내용 입력 필드 컴포넌트
const ContentInput = ({ onChange, value, placeholder }) => (
  <div className="myqna-input-field content-field">
    <textarea
      name="content"
      value={value}
      onChange={onChange}
      maxLength={2000}
      placeholder={placeholder}
      className="myqna-textarea-box"
    ></textarea>
    <div className="myqna-char-count">{value.length}/2000</div>
  </div>
);

// 메시지 알림 체크박스 컴포넌트
const MessageAlertCheckbox = ({ onChange }) => (
  <div className="myqna-checkbox-field">
    <input type="checkbox" name="messageAlert" onChange={onChange} />
    <label className="myqna-input-label">답변 완료 시 메시지 알림</label>
  </div>
);

// 폼 제출 버튼 컴포넌트
const SubmitButton = ({ onSubmit, text, className }) => (
  <button type="button" onClick={onSubmit} className={className}>
    {text}
  </button>
);

// 전체 폼 컴포넌트
const ContactForm = () => {
  const [formData, setFormData] = useState({
    contact: "",
    title: "",
    content: "",
    type: "",
    subType: "",
    messageAlert: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
    alert("제출이 완료되었습니다.");
  };

  return (
    <form className="myqna-contact-form">
      <div className="myqna-input-group-row">
          <label className="myqna-input-label">문의 유형<span className="myqna-required">*</span></label>
          <Dropdown
            label="문의 유형을 선택해 주세요.▾"
            options={["유형1", "유형2", "유형3"]}
            onSelect={(option) => setFormData({ ...formData, type: option })}
            selectedOption={formData.type}
          />
          <Dropdown
            label="세부선택▾"
            options={["세부1", "세부2", "세부3"]}
            onSelect={(option) => setFormData({ ...formData, subType: option })}
            selectedOption={formData.subType}
          />
        </div>
      <ContactInput
        value={formData.contact}
        onChange={handleChange}
        placeholder="연락처를 입력해 주세요."
      />
      <MessageAlertCheckbox onChange={handleChange} />
      <TitleInput
        value={formData.title}
        onChange={handleChange}
        placeholder="제목을 입력해 주세요. (최대 25자)"
      />
      <ContentInput
        value={formData.content}
        onChange={handleChange}
        placeholder="문의하실 내용을 입력해 주세요."
      />
      <div className="myqna-button-row">
        <SubmitButton onSubmit={handleSubmit} text="나의 문의 내역보기" className="myqna-view-button" />
        <SubmitButton onSubmit={handleSubmit} text="등록하기" className="myqna-submit-button" />
      </div>
      <p className="myqna-center-text">전화문의 1577-4701 | 운영시간 평일 09:30~17:30</p>
      <br></br>
      <p className="myqna-left-text">고객센터 문의량 증가로 인해 전화상담이 지연되고 있습니다. 1:1문의를 남겨주시면 순차적으로 확인 후 빠르게 답변 드릴 수 있도록 노력하겠습니다.</p>
    </form>
  );
};

// 전체 페이지를 감싸는 컴포넌트
const Myqna = () => {
  return (
    <div className="myqna-myqna-container">
      <div className="myqna-header">
        <h1>1:1 문의</h1>
      </div>
      <ContactForm />
    </div>
  );
};

export default Myqna;
