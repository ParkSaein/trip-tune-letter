// src/components/Header.jsx
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import "./Header.css";
import "../styles/global.css";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  // ✅ localStorage 기반으로 초기값 설정
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );
  const [role, setRole] = useState(localStorage.getItem("role") || "USER");
  const [isMyMenuOpen, setIsMyMenuOpen] = useState(false);

  const toggleMyMenu = () => {
    setIsMyMenuOpen((prev) => !prev);
  };

  // ✅ 로그인/로그아웃 직후 즉시 반영되게 이벤트 수신
  useEffect(() => {
    const syncAuth = () => {
      const token = localStorage.getItem("accessToken");
      setIsLoggedIn(!!token);
      setRole(localStorage.getItem("role") || "USER");
      setIsMyMenuOpen(false); // 상태 바뀌면 드롭다운 닫기
    };

    window.addEventListener("auth-changed", syncAuth);
    syncAuth(); // 최초 1회 동기화

    return () => window.removeEventListener("auth-changed", syncAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("role");

    // ✅ 헤더 갱신 이벤트
    window.dispatchEvent(new Event("auth-changed"));

    // UX상 홈으로 이동
    navigate("/");
  };

  return (
    <header className="header">
      {/* 왼쪽: 로고 + 타이틀 */}
      <div className="header-left">
        <img src={logo} alt="로고" className="logo" />
        <Link to="/" className="title">
          Trip Tune Letter
        </Link>
      </div>

      {/* 오른쪽: 회원가입 / 로그인 or 마이메뉴 */}
      <div className="header-right">
        {!isLoggedIn ? (
          <>
            <Link to="/signup" className="header-btn-join">
              회원가입
            </Link>
            <Link to="/login" className="header-btn-login">
              로그인
            </Link>
          </>
        ) : (
          <div className="my-menu-wrapper">
            <button className="header-btn-login" onClick={toggleMyMenu}>
              마이 메뉴
            </button>

            {isMyMenuOpen && (
              <ul className="my-menu-dropdown">
                <li>
                  <Link to="/mypage">회원정보 수정</Link>
                </li>

                {role === "USER" && (
                  <li>
                    <Link to="/scrap">스크랩</Link>
                  </li>
                )}

                {role === "ADMIN" && (
                  <li>
                    <Link to="/admin">관리자 페이지</Link>
                  </li>
                )}

                <li className="logout" onClick={handleLogout}>
                  로그아웃
                </li>

                <li className="delete">
                  <Link to="/delete">회원탈퇴</Link>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;