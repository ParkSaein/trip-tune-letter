import logo from "../assets/logo.png";
import { useState } from "react";
import './Header.css'
import '../styles/global.css'



function Header() {
  //여기는 자바스크립트 코드 영역
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 임시 로그인 상태
  const [isMyMenuOpen, setIsMyMenuOpen] = useState(false);

  const toggleMyMenu = () => {
    setIsMyMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsMyMenuOpen(false);
  };


  //아래의 return 안에는 웹에 보여줄 html 영역
  return (
    <header className="header">
        {/* 왼쪽: 로고 + 타이틀 */}
        <div className="header-left">
          <img
            src={logo}
            alt="로고"
            className="logo"
          />
          <span className="title">Trip Tune Letter</span>
        </div>

        {/* 오른쪽: 회원가입 / 로그인 */}
        <div className="header-right">
          {!isLoggedIn ? (
            <>
              <button className="header-btn-join">회원가입</button>
              <button className="header-btn-login">로그인</button>
            </>
          ) : (
            <div className="my-menu-wrapper">
              <button className="header-btn-login" onClick={toggleMyMenu} >
                마이 메뉴
              </button>

              {isMyMenuOpen && (
                <ul className="my-menu-dropdown">
                  <li>회원정보 수정</li>
                  <li>스크랩</li>
                  <li className='logout' onClick={handleLogout}>로그아웃</li>
                  <li className="delete">회원탈퇴</li>
                </ul>
              )}
            </div>
          )}
        </div>
    </header> 
  );
}

export default Header;