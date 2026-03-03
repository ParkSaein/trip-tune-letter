// src/components/LeftLink.jsx
import { Link } from "react-router-dom";
import "./LeftLink.css";


function LeftLink() {
    return (
        <div className="left-link">
            <Link to="/일반 뉴스레터 사이트 링크" className="left-link-btn">
                📩 일반 뉴스레터 📩
            </Link>
        </div>
    );
}


export default LeftLink;