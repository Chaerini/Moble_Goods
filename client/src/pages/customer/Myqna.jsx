import React, { useState } from "react";
import "./myqna.css";
import axios from "axios";
import { useNavigate } from "react-router";
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
    </div>
  );
};
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
  </div>
);
const NameInput = ({ onChange, value, placeholder }) => (
  <div className="myqna-input-field">
    <label className="myqna-input-label">작성자<span className="myqna-required">*</span></label>
    <input
      type="text"
      name="userId"
      value={value}
      onChange={onChange}
      maxLength={25}
      placeholder={placeholder}
      className="myqna-input-box"
    />
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
  <button type="button" className={className}>
    {text}
  </button>
);

// 전체 폼 컴포넌트
const ContactForm = () => {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        userId:"",
        title: "",
        contents: ""
  });

  const handleChange = (e) =>{
    setFormData((prev) => ({...prev,[e.target.name]:e.target.value}));
    };
  /* 나의 문의 내역보기 하이퍼링크 삽입*/
  const handleViewClick = () => {
    navigate("/myqnalist");
};

  const handleSubmit = async e => {
    try{
        e.preventDefault();
        console.log("====질문=====",formData)
        await axios.post(`http://localhost:8080/api/asks`,formData);
        console.log("추가완료");
        alert("추가완료")
    }catch(err){
        console.log("error",err);
    }
  };

  return (
    <form className="myqna-contact-form">
      <div className="myqna-input-group-row">
          <label className="myqna-input-label">문의 유형<span className="myqna-required">*</span></label>
          <Dropdown
            label="문의 유형을 선택해 주세요."
            options={["유형1", "유형2", "유형3"]}
            onSelect={(option) => setFormData({ ...formData, type: option })}
            selectedOption={formData.type}
          />
          <Dropdown
            label="세부선택"
            options={["세부1", "세부2", "세부3"]}
            onSelect={(option) => setFormData({ ...formData, subType: option })}
            selectedOption={formData.subType}
          />
        </div>
      <MessageAlertCheckbox onChange={handleChange} />
      <NameInput
        name="userId"
        placeholder="아이디를 입력해 주세요. (최대 25자)"
        onChange={handleChange}
        className="myqna-input-box"
      />
      <TitleInput
        name="title"
        placeholder="제목을 입력해 주세요. (최대 25자)"
        onChange={handleChange}
        className="myqna-input-box"
      />
      <ContentInput
        name="contents"
        placeholder="문의하실 내용을 입력해 주세요."
        onChange={handleChange}
        className="myqna-textarea-box"
      />
      <div className="myqna-button-row">
      <button onClick={handleViewClick} className="myqna-view-button">나의 문의 내역보기</button>
      <button onClick={handleSubmit} className="myqna-submit-button">등록하기</button>
      </div>
      <p className="myqna-center-text">
        전화문의 <span className="highlight">777-777</span> | 운영시간 <span className="highlight">평일 09:30~17:30</span>
      </p>      
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
