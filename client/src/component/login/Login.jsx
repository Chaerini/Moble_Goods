import './login.css';

const Login = () => {
    return (
        <div className="login">
            <div className="login-container">
                <h1>로고</h1>
                <input type='text' placeholder='아이디 입력' className='login-input'></input>
                <input type='password' placeholder='비밀번호 입력' className='login-input'></input>
                <button className='login-button'>로그인</button>
                <div className='login-div-a'>
                    <a className='login-a'>회원가입</a>
                    <span className='login-line'>|</span>
                    <a className='login-a'>비밀번호 찾기</a>
                </div>
            </div>
        </div>
    );
};

export default Login;