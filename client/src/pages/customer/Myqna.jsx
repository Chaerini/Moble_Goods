import React, { useState } from "react";
import "./myqna.css";

const Myqna = () => {
  const ToggleSection = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className="toggle-section">
        <button onClick={toggleOpen}>문의 유형을 선택해주세요.</button>
        {isOpen && (
          <div className="dropdown">
            <label>
              <input type="radio" name="type" value="문의1" /> 문의1
            </label>
            <label>
              <input type="radio" name="type" value="문의2" /> 문의2
            </label>
          </div>
        )}
      </div>
    );
  };

  const ContactInput = ({ onChange }) => (
    <div className="input-field">
      <label>연락처를 입력해 주세요.</label>
      <input type="text" name="contact" onChange={onChange} />
    </div>
  );

  const TitleInput = ({ onChange }) => (
    <div className="input-field">
      <label>제목을 입력해 주세요.</label>
      <input type="text" name="title" onChange={onChange} />
    </div>
  );

  const ContentInput = ({ onChange }) => (
    <div className="input-field">
      <label>문의하실 내용을 입력해 주세요.</label>
      <textarea name="content" onChange={onChange}></textarea>
    </div>
  );

  const SubmitButton = ({ onSubmit }) => (
    <button type="button" onClick={onSubmit}>
      Submit
    </button>
  );

  const ContactForm = () => {
    const [formData, setFormData] = useState({
      contact: "",
      title: "",
      content: "",
      type: "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleSubmit = () => {
      // DB 저장 로직
      console.log("Submitted Data:", formData);
      alert("제출이 완료되었습니다.");
    };

    return (
      <form className="contact-form">
        <ToggleSection />
        <ContactInput onChange={handleChange} />
        <TitleInput onChange={handleChange} />
        <ContentInput onChange={handleChange} />
        <SubmitButton onSubmit={handleSubmit} />
      </form>
    );
  };

  return (
    <div>s
      <h1>1:1 문의</h1>
    </div>
  );


};

export default Myqna;
