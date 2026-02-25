import './components/Header.css'
import Router from "./router/router";
import Header from "./components/Header"; // 이미 작성된 공통 헤더
import LeftLink from './components/LeftLink';
import "./App.css";


function App() {
  return (
    <div className='app'>
      {/* 공통 헤더 */}
      <div>
        <Header />
      </div>

      {/* 왼쪽-일반 뉴스레터 버튼 */}
      <LeftLink />

      {/* 페이지 렌더링 담당 */}
      <main className='content'>
        <Router />
      </main>
    </div>
  );
}

export default App;