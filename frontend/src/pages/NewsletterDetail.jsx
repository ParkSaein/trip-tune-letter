// src/pages/NewsletterDetail.jsx
import { useParams } from "react-router-dom";
import { useState } from "react";
import "./NewsletterDetail.css";
import sample1 from "../assets/sample1.png"; // 이미지 import


function NewsletterDetail(){
  const { id } = useParams();

  // ✅ 관리자 여부 (로그인 시 저장해둔다고 가정)
  const role = localStorage.getItem("role");

  // ✅ 수정 모드 상태
  const [isEditing, setIsEditing] = useState(false);

  // ✅ newsletter를 state로 관리 (중요)
  const [newsletter, setNewsletter] = useState({
    id: id,
    title: "제주 감성 여행, 다시 떠오르는 힐링 여행지",
    image: "/src/assets/sample1.png",  //실제 이미지 경로로 교체
    content: `제주는 최근 자연 속 힐링 여행지로 다시 주목받고 있습니다.
한라산의 설경과 푸른 바다, 그리고 한적한 카페들이 여행자들의 발길을 사로잡고 있습니다.

특히 겨울철 오름 트레킹과 감성 숙소 여행이 SNS에서 큰 인기를 끌고 있습니다.
AI가 수집한 최신 여행 트렌드 분석에 따르면, '조용한 휴식' 키워드 검색량이 크게 증가했습니다.`,
    musicTitle: "밤편지",
    artist: "아이유",
    youtubeUrl: "https://www.youtube.com/watch?v=BzYnNdJhZQw",
    isPublished: false  // ✅ 임시저장 여부 가정
  });


  // ✅ 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewsletter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ 저장 버튼
  const handleSave = () => {
    alert("저장 완료 (현재는 프론트만 반영)");
    setIsEditing(false);

    // 🔥 나중에 여기 axios.put 추가하면 됨
  };

  const handleDelete = () => {
    alert("삭제 기능 (백엔드 연결 예정)");
  };

  const handlePublish = () => {
    alert("공개 처리 (백엔드 연결 예정)");
  };


  return (
    <div className="detail-container">
      {/* 🔥 제목 */}
      {isEditing ? (
        <input
          type="text"
          name="title"
          value={newsletter.title}
          onChange={handleChange}
          className="edit-input"
        />
      ) : (
        <h1 className="detail-title">{newsletter.title}</h1>
      )}

      {/* 🔥 이미지 */}
      <img
        src={newsletter.image}
        alt={newsletter.title}
        className="detail-image"
      />

      {/* 🔥 내용 */}
      {isEditing ? (
        <textarea
          name="content"
          value={newsletter.content}
          onChange={handleChange}
          className="edit-textarea"
        />
      ) : (
        <div className="detail-content">
          {newsletter.content}
        </div>
      )}

      {/* 🔥 음악 섹션 */}
      <div className={`music-section ${isEditing ? "editing" : ""}`}>
      <h2>🎵 음악 추천 🎵</h2>

      {isEditing ? (
        <>
          <div className="music-edit-row">
            <label>노래 제목:</label>
            <input
              type="text"
              name="musicTitle"
              value={newsletter.musicTitle}
              onChange={handleChange}
            />
          </div>

          <div className="music-edit-row">
            <label>가수명:</label>
            <input
              type="text"
              name="artist"
              value={newsletter.artist}
              onChange={handleChange}
            />
          </div>

          <div className="music-edit-row">
            <label>유튜브 링크:</label>
            <input
              type="text"
              name="yutubeLink"
              value={newsletter.artist}
              onChange={handleChange}
            />
          </div>
        </>
      ) : (
        <>
          <p><strong>노래:</strong> {newsletter.musicTitle}</p>
          <p><strong>가수:</strong> {newsletter.artist}</p>
          <p><strong>유튜브 링크:</strong> {newsletter.youtubeUrl}</p>
        </>
      )}
    </div>


      {/* ✅ 관리자 버튼 */}
      {role === "ADMIN" && (
        <div className="admin-buttons">

          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="edit-btn"
              >
                수정
              </button>

              <button onClick={handleDelete} className="delete-btn">
                삭제
              </button>

              {!newsletter.isPublished && (
                <button
                  onClick={handlePublish}
                  className="publish-btn"
                >
                  공개
                </button>
              )}
            </>
          ) : (
            <>
              <button onClick={handleSave} className="publish-btn">
                저장
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="delete-btn"
              >
                취소
              </button>
            </>
          )}

        </div>
      )}
      
      

    </div>
  );
}

export default NewsletterDetail;
