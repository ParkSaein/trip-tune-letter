import './components/Header.css'
import Router from "./router/router";
import Header from "./components/Header"; // 이미 작성된 공통 헤더

function App() {
  return (
    <div className='app'>
      {/* 공통 헤더 */}
      <div>
        <Header />
      </div>

      {/* 페이지 렌더링 담당 */}
      <div>
        <Router />
      </div>
    </div>
  );
}

export default App;