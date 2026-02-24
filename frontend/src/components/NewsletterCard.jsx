import "./NewsletterCard.css";
import { Link } from "react-router-dom";
import jeju from "../assets/sample1.PNG"




function NewsletterCard({ data }) {
  return (
    <div className="card">
      <img src={data.image} alt={data.title} className="thumbnail" />

        <div className="card-content">
            <div className="card-data">
                <div className="card-data1">
                    <span className="card-title">{data.title}</span>
                    <p className="card-date">{data.date}</p>
                </div>
                <div className="card-data2">
                    <p className="card-summary">{data.summary}</p>
                </div>
            </div>

            <div className="card-buttons">
                <button className="card-scrap">📌 스크랩</button>
                <button className="card-like">❤️ {data.likes}</button>
                <Link to={`/newsletter/${data.id}`}>
                    <button className="detail-btn">상세보기</button>
                </Link>
            </div>
        </div>
    </div>
  );
}

export default NewsletterCard;
