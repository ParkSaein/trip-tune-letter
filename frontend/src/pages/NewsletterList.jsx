// src/pages/NewsletterList.jsx
import { useState } from "react";
import NewsletterCard from "../components/NewsletterCard";
import SearchBar from "../components/SearchBar";
import SortSelect from "../components/SortSelect";
import "./NewsletterList.css";

import jeju from "../assets/sample1.PNG";
import tokyo from "../assets/sample2.PNG"



const dummyData = [
  {
    id: 1,
    title: "제주 감성 여행",
    date: "2026-02-18",
    summary: "요즘 가장 핫한 제주 감성 스팟 소개",
    likes: 12,
    image: jeju,
  },
  {
    id: 2,
    title: "도쿄 야경 투어",
    date: "2026-02-17",
    summary: "도쿄에서 꼭 가봐야 할 야경 명소",
    likes: 25,
    image: tokyo,
  },
];





function NewsletterList() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");

  const filtered = dummyData
    .filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sort === "latest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );

  return (
    <div className="container">
      <div className="top-bar">
        <SearchBar search={search} setSearch={setSearch} />
        <SortSelect sort={sort} setSort={setSort} />
      </div>

      <div className="newsletter-list">
        {filtered.map((item) => (
          <NewsletterCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}


export default NewsletterList;