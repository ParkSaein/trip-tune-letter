// src/pages/NewsletterList.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router"; // Router를 따로 import
import "./App.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);






const NewsletterList = () => {
  return <div>뉴스레터 목록</div>;
};

export default NewsletterList;