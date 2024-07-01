import './register.css';

const Register = () => {
    return (
        <div className="register">
            <div className="register-container">
                <h1 className='register-h1'>회원가입</h1>
                <div className='register-list'>
                    <span className='register-left'>아이디<em className='register-em'>*</em></span>
                    <input type='text' placeholder='아이디 입력' className='register-input'></input>
                </div>
                <div className='register-list'>
                    <span className='register-left'>비밀번호<em className='register-em'>*</em></span>
                    <input type='text' placeholder='비밀번호(영문·숫자 조합 8~15자리)' className='register-input'></input>
                </div>
                <div className='register-list'>
                    <span className='register-left'>비밀번호 확인<em className='register-em'>*</em></span>
                    <input type='text' placeholder='비밀번호 확인' className='register-input'></input>
                </div>
                <div className='register-list'>
                    <span className='register-left'>이름<em className='register-em'>*</em></span>
                    <input type='text' placeholder='이름 입력' className='register-input'></input>
                </div>
                <div className='register-list'>
                    <span className='register-left'>연락처<em className='register-em'>*</em></span>
                    <input type='text' placeholder='연락처(숫자만 입력)' className='register-input'></input>
                </div>
                <div className='register-agreement'>
                    <div><input type='checkbox'></input><label><b>전체동의</b></label></div>
                    <div><input type='checkbox'></input><label>만 14세 이상입니다. (필수)</label></div>
                    <div><input type='checkbox'></input><label>굿포유 <a href='/'>이용 약관</a> 동의 (필수)</label></div>
                    <div><input type='checkbox'></input><label><a href='/'>개인정보 수집 및 이용</a> 동의 (필수)</label></div>
                </div>
                <button className='register-button'>완료</button>
            </div>
        </div>
    );
};

export default Register;