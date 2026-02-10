import './App.css'
import logo from "./assets/logo.png";
import { Outlet } from "react-router-dom";


function App() {
  //여기는 자바스크립트 코드 영역

  //아래의 return 안에는 웹에 보여줄 html 영역
  return (
    <div className="app-container">
      {/* Header */}
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
          <button className="header-btn-join">회원가입</button>
          <button className="header-btn-login">로그인</button>
        </div>
      </header>

      {/* 메인 컨텐츠 영역 */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default App;