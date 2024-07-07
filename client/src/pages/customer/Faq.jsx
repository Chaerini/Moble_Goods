import React, { useState, useRef,useEffect } from 'react';
import './faq.css'; // CSS 파일을 가져옵니다.
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faPlus} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router';
const Faq = () => {
  // 상태 정의: 검색어와 활성화된 질문 인덱스
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIndex, setActiveIndex] = useState(null);

  // 상태 정의: 현재 보이는 첫 카테고리 인덱스
  const [visibleIndex, setVisibleIndex] = useState(0);

  // FAQ 항목들을 참조하기 위한 배열 생성
  const faqRefs = useRef([]);
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();
  const [mpData,setMpData] = useState({
    userId:"",
    title:"",
    contents:""

});
  const navigate=useNavigate();
  // 카테고리 배열
  const categories = [
    '휴대폰/실시간계좌이체', '회원등급', '회원가입/정보변경', 
    '환불방법', '쿠폰/포인트', '상품문의', '배송조회', '기타'
  ];

  // FAQ 질문 배열
  const faqs = [
    '스냅스 웹사이트 이용 적정 모니터 해상도 안내',
    '주문한 제품 수정할 수 있나요?',
    '신용카드 영수증을 받고 싶어요',
    '현금영수증지출증빙을 받고 싶어요',
    '쿠폰 번호는 어떻게 등록하나요?',
    '세금계산서를 발행해주세요',
    '이니시스 결제 설치가 안돼요',
    '선입금하여 나중에 주문 시 사용할 수 있나요?',
    'ATM으로 입금하는데 원단위 금액은 어떻게 하나요?',
    '사진이미지 보내드리면 편집 해주나요?',
    '장바구니에 저장한 상품은 얼마나 보관되나요?',
    '주문한 상품을 다시 주문할 수 있나요?',
    '환불은 언제 처리되나요?',
    '어느 택배를 이용하나요?',
    '직접수령 가능한가요?',
    '상품 주문 후 배송지를 변경하고 싶어요',
    '퀵으로 빨리 받고 싶어요',
    '묶음배송을 받고 싶어요',
    '사진인화 사이즈를 기준으로 알고 싶어요.',
    '주문을 취소하고 싶어요',
    '원본사진은 괜찮은데 편집화면에서 깨져 보여요',
    'CMYK로 작업해도 되나요? / 색상 모드는 어떤 걸로 설정해야 하나요?',
    '임시비밀번호를 발급받았는데 이메일이 안 와요',
    '영수증이나 기타 가격표시 없이 배송해 주세요.',
    '상품권 구매도 서류발행 가능한가요?',
    '타견적서 가능한가요?',
    '일반영수증은 어떻게 발급 받나요??',
    '발행가능한 서류는 어떻게 되나요?',
    '휴대폰 결제 건도 세금계산서나 현금영수증을 받을 수 있나요?'
  ];

  // 드롭다운을 토글하는 함수
  const toggleDropdown = (index) => {
    // 같은 항목을 클릭하면 닫히고, 다른 항목을 클릭하면 열립니다.
    setActiveIndex(activeIndex === index ? null : index);
    // 선택된 항목으로 스크롤
    if (faqRefs.current[index]) {
      faqRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 카테고리를 오른쪽으로 이동시키는 함수
  const showNextCategories = () => {
    if (visibleIndex < categories.length - 4) {
      setVisibleIndex(visibleIndex + 4);
    }
  };

  // 카테고리를 왼쪽으로 이동시키는 함수
  const showPreviousCategories = () => {
    if (visibleIndex > 0) {
      setVisibleIndex(visibleIndex - 4);
    }
  };

 // 텍스트를 강조하는 함수
  const highlightText = (faq, searchTerm) => {
    if (!searchTerm) return faq;
    const parts = faq.split(new RegExp(`(${searchTerm})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => (
          <span
            key={i}
            style={part.toLowerCase() === searchTerm.toLowerCase() ? { fontWeight: 'bold', backgroundColor: 'yellow' } : {}}
          >
            {part}
          </span>
        ))}
      </span>
    );
  };

  // 검색어로 필터링된 FAQ 목록
  const filteredFaqs = faqs.filter(faq => faq.includes(searchTerm));
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/asks`,);
            console.log("data",response.data.result);
            setData(response.data.result);
        }catch (error) {
            console.error('Error fetching data', error);
        }
    };
    
    fetchData();
}, []);
  const handleDelete  = async(id) =>{
    try{
        await axios.delete(`http://localhost:8080/api/asks/`+id)
        window.location.reload();
    }catch(err){
        console.log(err)
    }
}
const handleEditAction = async (userId) =>{
  setModalOpen(false);
  console.log(mpData)
  console.log("=======아이디=====",userId)
  try {
      const res=await axios.put(`http://localhost:8080/api/asks/`+userId,mpData);
      alert('질문 정보가 수정되었습니다.');
  } catch (err) {
      alert('질문 수정을 실패했습니다. 다시 시도해주세요.')
      console.log(err);
  }
}
const handleEditClick = async(user) =>{
  console.log("product",user);
  setMpData({
      userId:user.id,
      title:user.title,
      contents:user.contents
    });
  setModalOpen(true);
  console.log(mpData)

}
const handleChange = (e) =>{
  const{name,value}=e.target;
  setMpData((prev) => ({...prev,[name]:value}));
};
  return (
    <div className="container">
      {/* FAQ 헤더 */}
      <h1 className="search-header">FAQ</h1>
      <div className="product-container">
            <h2 className='notice'>질문</h2>
            <FontAwesomeIcon icon={faPlus} onClick={()=>navigate("/addfaq")}/>
            <input
        type="text"
        className="faq-search"
        placeholder="궁금한 사항을 입력해 주세요."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onFocus={e => e.target.placeholder = ''}
        onBlur={e => e.target.placeholder = '궁금한 사항을 입력해 주세요.'}
      />
      {/* 카테고리 목록 및 좌우 이동 버튼 */}
      {/* FAQ 질문 목록 */}
      <div className="faq-list">
      <table className='notice-table'>
                <thead>
                    <tr>
                        <th className='th'>제목</th>
                        <th className='th'>내용</th>
                        <th className='th'>수정</th>
                        <th className='th'>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user) => (
                        <tr key={user.id} className='tr'>
                            <td className='td'>{user.title}</td>
                            <td className='td'>{user.discount}</td>
                            <td className='td'>
                                <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(user.id)} />
                                <FontAwesomeIcon icon={faPen} onClick={() => handleEditClick(user)}/>
                                {
          modalOpen &&
    <div className={'modal-container'} ref={modalBackground} onClick={e => {
        if(e.target===modalBackground.currnet){
            setModalOpen(false);
        }
    }}>
        
            <div className="login">
                <div className="login-container">
                <label>질문 수정하기</label>
                <input type="hidden"  name="id"  className="product-input" value={mpData.userId}/>
                <input type="text" onChange={handleChange} name="title" placeholder="제목" className="product-input" value={mpData.title}/>
                <input type="text" onChange={handleChange} name="cotents" placeholder="내용" className="product-input" value={mpData.contents}/>
                <button onClick={()=>handleEditAction(mpData.userId)} className="btn">수정</button>
                </div>
            </div>
    </div>
        }
                            </td>     
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    </div>
</div>
    );
};
export default Faq;
