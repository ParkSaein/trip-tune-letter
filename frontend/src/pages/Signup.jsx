import "../styles/auth.css"
import { useState } from "react";
function Signup({ onChangePage }) {
    return(
        <div className="auth-container signup">
          <h2>SIGN UP</h2>
        <form className="auth-form">
            <input type="text" placeholder="이메일 (영문/숫자 4~12자)" />
            <input type="name" placeholder="이름" />
            <input type="nickname" placeholder="닉네임" />
            <input type="password" placeholder="비밀번호 (8자 이상)" />
            <input type="password" placeholder="비밀번호 확인" />
        <button type="button" className="signup">무료로 시작하기</button>
        </form>

        <p className="auth-text">
            이미 계정이 있나요?{" "}
            <span onClick={()=> onChangePage("login")}>로그인</span>
        </p>
    </div>
    );
}

export default Signup;

