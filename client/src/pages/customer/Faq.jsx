const Customer = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <header className="header">
        <h1>FAQ</h1>
        <div className="search-container">
          <input type="text" placeholder="궁금한 사항을 입력해 주세요." />
          <button type="button">
            <span role="img" aria-label="search">
              🔍
            </span>
          </button>
        </div>
        <nav className="nav-tabs">
          <a href="#휴대폰/실시간계좌이체">휴대폰/실시간계좌이체</a>
          <a href="#회원등급">회원등급</a>
          <a href="#회원가입/정보변경">회원가입/정보변경</a>
          <a href="#환불방법">환불방법</a>
        </nav>
      </header>
      <main>
        {faqItems.map((item, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFaq(index)}>
              <span>Q. {item}</span>
              <span>{activeIndex === index ? "▲" : "▼"}</span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                <p>여기에 답변 내용이 들어갑니다.</p>
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
};

export default Customer;
