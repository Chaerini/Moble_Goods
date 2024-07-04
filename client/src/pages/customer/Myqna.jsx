// 
import React, { useState } from "react";
import "./myqna.css";

// ToggleSection 컴포넌트: 문의 유형과 세부 선택을 위한 드롭다운
const ToggleSection = ({ label, options, onSelect, fullWidth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={`toggle-section ${fullWidth ? "full-width" : "half-width"}`}>
      <button onClick={toggleOpen} className="toggle-button no-border">
        {label} <span className="arrow">&#9662;</span>
      </button>
      {isOpen && (
        <div className="dropdown">
          {options.map((option, index) => (
            <div key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 연락처 입력 필드 컴포넌트
const ContactInput = ({ onChange, value, placeholder }) => (
  <div className="input-field">
    <label>연락처</label>
    <input
      type="text"
      name="contact"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

// 문의 제목 입력 필드 컴포넌트
const TitleInput = ({ onChange, value, placeholder }) => (
  <div className="input-field">
    <label>문의 제목<span className="required">*</span></label>
    <input
      type="text"
      name="title"
      value={value}
      onChange={onChange}
      maxLength={25}
      placeholder={placeholder}
    />
  </div>
);

// 문의 내용 입력 필드 컴포넌트
const ContentInput = ({ onChange, value, placeholder }) => (
  <div className="input-field content-field">
    <textarea
      name="content"
      value={value}
      onChange={onChange}
      maxLength={2000}
      placeholder={placeholder}
    ></textarea>
    <div className="char-count">{value.length}/2000</div>
  </div>
);

// 메시지 알림 체크박스 컴포넌트
const MessageAlertCheckbox = ({ onChange }) => (
  <div className="checkbox-field">
    <input type="checkbox" name="messageAlert" onChange={onChange} />
    <label>답변 완료 시 메시지 알림</label>
  </div>
);

// 폼 제출 버튼 컴포넌트
const SubmitButton = ({ onSubmit }) => (
  <button type="button" onClick={onSubmit} className="submit-button">
    Submit
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
    <form className="contact-form">
      <div className="input-group-row">
        <div className="input-group">
          <h2>문의 유형<span className="required">*</span></h2>
          <ToggleSection
            label="문의 유형을 선택해 주세요."
            options={["유형1", "유형2", "유형3"]}
            onSelect={(option) => setFormData({ ...formData, type: option })}
          />
        </div>
        <div className="input-group">
          <ToggleSection
            label="세부선택"
            options={["세부1", "세부2", "세부3"]}
            onSelect={(option) => setFormData({ ...formData, subType: option })}
          />
        </div>
      </div>
      <MessageAlertCheckbox onChange={handleChange} />
      <ContactInput
        value={formData.contact}
        onChange={handleChange}
        placeholder="연락처를 입력해 주세요."
      />
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
      <SubmitButton onSubmit={handleSubmit} />
    </form>
  );
};

// 전체 페이지를 감싸는 컴포넌트
const Myqna = () => {
  return (
    <div className="myqna-container">
      <div className="myqna-header">
        <h1>1:1 문의</h1>
      </div>
      <ContactForm />
    </div>
  );
};

export default Myqna;
