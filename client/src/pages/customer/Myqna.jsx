import React, { useState } from "react";
import "./myqna.css";

// ToggleSection 컴포넌트: 문의 유형을 선택할 수 있는 토글 버튼과 옵션 리스트를 제공
const ToggleSection = ({ label, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="toggle-section">
      <button onClick={toggleOpen} className="toggle-button">
        {selectedOption || label}
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

// ContactInput 컴포넌트: 연락처 입력 필드
const ContactInput = ({ onChange, value, placeholder }) => (
  <div className="input-field">
    <h3>연락처</h3>
    <input 
      type="text" 
      name="contact" 
      value={value} 
      onChange={onChange} 
      placeholder={placeholder} 
    /> 
  </div>
);

// TitleInput 컴포넌트: 제목 입력 필드
const TitleInput = ({ onChange, value, placeholder }) => (
  <div className="input-field">
    <h3>문의 제목*</h3>
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

// ContentInput 컴포넌트: 문의 내용 입력 필드
const ContentInput = ({ onChange, value, placeholder }) => (
  <div className="input-field">
    <textarea 
      name="content" 
      value={value} 
      onChange={onChange} 
      maxLength={2000} 
      placeholder={placeholder}
    ></textarea>
  </div>
);

// MessageAlertCheckbox 컴포넌트: 답변 완료 시 메시지 알림 체크박스
const MessageAlertCheckbox = ({ onChange }) => (
  <div className="checkbox-field">
    <input type="checkbox" name="messageAlert" onChange={onChange} />
    <label>답변완료 시 메세지 알림</label>
  </div>
);

// SubmitButton 컴포넌트: 폼 제출 버튼
const SubmitButton = ({ onSubmit }) => (
  <button type="button" onClick={onSubmit} className="submit-button">
    Submit
  </button>
);

// ContactForm 컴포넌트: 전체 폼을 감싸는 컴포넌트
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
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = () => {
    // DB 저장 로직
    console.log("Submitted Data:", formData);
    alert("제출이 완료되었습니다.");
  };

  return (
    <form className="contact-form">
      <div className="input-group-row">
        <div className="input-group">
          <h2>문의유형<span className="required">*</span></h2>
          <ToggleSection
            label="문의 유형을 선택해주세요."
            options={['유형1', '유형2', '유형3']}
            onSelect={(option) => setFormData({ ...formData, type: option })}
          />
        </div>
        <div className="input-group">
          <ToggleSection
            label="세부선택"
            options={['세부1', '세부2', '세부3']}
            onSelect={(option) => setFormData({ ...formData, subType: option })}
          />
        </div>
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
      <SubmitButton onSubmit={handleSubmit} />
    </form>
  );
};

// Myqna 컴포넌트: 전체 페이지를 감싸는 컴포넌트
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
