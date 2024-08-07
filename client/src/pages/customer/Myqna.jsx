import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import "./myqna.css";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import Navbar from "../../component/navbar/navbar";
import Footer from "../../component/footer/footer";
import Header from "../../component/header/header";

// Dropdown 컴포넌트: 문의 유형과 세부 선택을 위한 드롭다운
const Dropdown = ({ label, options, onSelect, selectedOption }) => {
  const { user } = useContext(AuthContext);
  console.log(user);
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

// 연락처 입력 필드 컴포넌트
const ContactInput = ({ onChange, value, placeholder }) => {
  const handleInputChange = (event) => {
    const input = event.target.value;
    const formattedInput = formatPhoneNumber(input);
    onChange({ target: { name: 'contact', value: formattedInput } });
  };

  const formatPhoneNumber = (input) => {
    // 숫자만 남기기
    input = input.replace(/\D/g, '');
    // 000-0000-0000 형식으로 포맷팅
    if (input.length <= 3) {
      return input;
    } else if (input.length <= 7) {
      return `${input.slice(0, 3)}-${input.slice(3, 7)}`;
    } else {
      return `${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(7, 11)}`;
    }
  };

  return (
    <div className="myqna-input-field">
      <label className="myqna-input-label">연락처</label>
      <input
        type="text"
        name="contact"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="myqna-input-box"
        maxLength={13} // 최대 길이 설정
      />
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
      name="contents"
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
  <button type="button" className={className}>
    {text}
  </button>
);

// 전체 폼 컴포넌트
const ContactForm = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    user_id: user.id,
    title: "",
    contents: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const navigate = useNavigate();

  /* 나의 문의 내역보기 하이퍼링크 삽입*/
  const handleViewClick = () => {
    navigate('/myqnalist');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      console.log("====질문=====", formData)
      await axios.post(`http://localhost:8080/api/asks`, formData);
      console.log("추가완료");
      alert("제출이 완료되었습니다.")
    } catch (err) {
      console.log("error", err);
      alert("문의 추가에 실패했습니다.");
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
        value={formData.contents}
        onChange={handleChange}
        placeholder="문의하실 내용을 입력해 주세요."
      />
      <div className="myqna-button-row">
        <button onClick={handleViewClick} className="myqna-view-button" >
          나의 문의 내역
        </button>
        <button onClick={handleSubmit} className="myqna-submit-button" >
          등록
        </button>
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
    <>
      <Header />
      <Navbar />
      <div className="myqna-myqna-container">
        <div className="myqna-header">
          <h1>1:1 문의</h1>
        </div>
        <ContactForm />
      </div>
      <Footer />
    </>
  );
};

export default Myqna;

