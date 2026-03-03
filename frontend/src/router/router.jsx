// src/router/router.jsx
import { Routes, Route } from "react-router-dom";
import NewsletterList from "../pages/NewsletterList";
import NewsletterDetail from "../pages/NewsletterDetail";
import Login from "../pages/Login";
import LeftLink from "../components/LeftLink";
import Signup from "../pages/Signup";


export default function Router() {
    return(
        <Routes>
            {/* 메인 화면 */}
            <Route path="/" element={<NewsletterList />} />

            {/* 로그인 화면 */}
            <Route path="/login" element={<Login />} />

            {/* 회원가입 화면 */}
            <Route path="/Signup" element={<Signup />} />

            {/* 뉴스레터 상세보기 */}
            <Route path="/newsletter/:id" element={<NewsletterDetail />} />
        </Routes> 
    );
}