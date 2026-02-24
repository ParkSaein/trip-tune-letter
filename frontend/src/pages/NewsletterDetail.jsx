// src/pages/NewsletterDetail.jsx
import { useParams } from "react-router-dom";
import "./NewsletterDetail.css";


function NewsletterDetail(){
  const { id } = useParams();

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
    youtubeUrl: "https://www.youtube.com/watch?v=BzYnNdJhZQw"
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
    </div>
  );
}

export default NewsletterDetail;
