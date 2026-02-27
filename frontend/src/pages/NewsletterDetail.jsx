// src/pages/NewsletterDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import "./NewsletterDetail.css";
import sample1 from "../assets/sample1.png"; // 이미지 import


function NewsletterDetail(){
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ 관리자 여부 (로그인 시 저장해둔다고 가정)
  const role = localStorage.getItem("role");

  // 🔥 나중에 백엔드에서 axios로 받아올 자리
  const newsletter = {
    id: id,
    title: "제주 감성 여행, 다시 떠오르는 힐링 여행지",
    image: "/src/assets/sample1.png", // 실제 이미지 경로로 교체
    content: `제주는 최근 자연 속 힐링 여행지로 다시 주목받고 있습니다.
한라산의 설경과 푸른 바다, 그리고 한적한 카페들이 여행자들의 발길을 사로잡고 있습니다.

특히 겨울철 오름 트레킹과 감성 숙소 여행이 SNS에서 큰 인기를 끌고 있습니다.
AI가 수집한 최신 여행 트렌드 분석에 따르면, '조용한 휴식' 키워드 검색량이 크게 증가했습니다.
    `,
    musicTitle: "밤편지",
    artist: "아이유",
    youtubeUrl: "https://www.youtube.com/watch?v=BzYnNdJhZQw",
    isPublished: false // ✅ 임시저장 여부 가정
  };


  // ✅ 버튼 핸들러 (나중에 axios 연결)
  const handleEdit = () => {
    navigate(`/newsletter/edit/${id}`);
  };

  const handleDelete = () => {
    alert("삭제 기능 (백엔드 연결 예정)");
  };

  const handlePublish = () => {
    alert("공개 처리 (백엔드 연결 예정)");
  };


  return (
    <div className="detail-container">
      <h1 className="detail-title">{newsletter.title}</h1>

      <img
        src={newsletter.image}
        alt={newsletter.title}
        className="detail-image"
      />

      <div className="detail-content">
        {newsletter.content}
      </div>

      <div className="music-section">
        <h2>🎵 음악 추천 🎵</h2>
        <p><strong>노래:</strong> {newsletter.musicTitle}</p>
        <p><strong>가수:</strong> {newsletter.artist}</p>

        <a
          href={newsletter.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="youtube-button"
        >
          유튜브에서 듣기 ▶
        </a>
      </div>

      {/* ✅ 관리자 전용 버튼 */}
      {role === "ROLE_ADMIN" && (
        <div className="admin-buttons">
          <button onClick={handleEdit} className="edit-btn">수정</button>
          <button onClick={handleDelete} className="delete-btn">삭제</button>

          {!newsletter.isPublished && (
            <button onClick={handlePublish} className="publish-btn">
              공개
            </button>
          )}
        </div>
      )}
      
    </div>
  );
}

export default NewsletterDetail;
