import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import HeadAppBar from "./components/HeadAppBar";
import NavMenu from "./components/NavMenu";
import HomePage from "./pages/HomePage.tsx";
import EditNewsPage from "./pages/EditNewsPage.tsx";
import NewsPage from "./pages/NewsPage.tsx";
import { useState, useMemo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from "./theme";
import MyNewsPage from "./pages/MyNewsPage.tsx";
import MyComments from "./pages/MyComments.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import DestinationsPage from "./pages/DestinationsPage.tsx";
import ChatPage from "./pages/ChatPage.tsx";
import EditProductPage from "./pages/EditProductPage.tsx";
import EditDestinationPage from "./pages/EditDestinationPage.tsx";
import MyProductsPage from "./pages/MyProductsPage.tsx";
import MyDestinationsPage from "./pages/MyDestinationsPage.tsx";
import ProductDetailPage from "./pages/ProductDetailPage.tsx";
import DestinationDetailPage from "./pages/DestinationDetailPage.tsx";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const [open, setOpen] = useState(false);

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const muiTheme = useMemo(() => createTheme(theme(mode)), [mode]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Router>
        <HeadAppBar onMenuClick={() => setOpen(true)} mode={mode} onToggleMode={toggleMode} />
        <NavMenu open={open} onClose={() => setOpen(false)} />

        <Routes>
          <Route
            // 홈 페이지
            path="/"
            element={<HomePage />} />
          <Route
            // 뉴스 상세 페이지
            path="/news/:id"
            element={<NewsPage />} />
          <Route
            // 상품 목록
            path="/products"
            element={<ProductsPage />} />
          <Route
            // 여행지 목록
            path="/destinations"
            element={<DestinationsPage />} />
          <Route
            // 상품 상세 페이지
            path="/products/:id"
            element={<ProductDetailPage />} />
          <Route
            // 여행지 상세 페이지
            path="/destinations/:id"
            element={<DestinationDetailPage />} />
          <Route
            // 상품 추가/수정
            path="/editproduct/:id?"
            element={
              <ProtectedRoute requiredRole="MANAGER">
                <EditProductPage />
              </ProtectedRoute>
            }
          />
          <Route
            // 여행지 추가/수정
            path="/editdestination/:id?"
            element={
              <ProtectedRoute requiredRole="MANAGER">
                <EditDestinationPage />
              </ProtectedRoute>
            }
          />
          <Route
            // 내가 쓴 상품 목록
            path="/myproducts"
            element={
              <ProtectedRoute requiredRole="MANAGER">
                <MyProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            // 내가 쓴 여행지 목록
            path="/mydestinations"
            element={
              <ProtectedRoute requiredRole="MANAGER">
                <MyDestinationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            // 채팅
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
          <Route
            // 뉴스 생성
            path="/editnews"
            element={
              <ProtectedRoute>
                <EditNewsPage />
              </ProtectedRoute>
            }
          />
          <Route
            // 뉴스 수정
            path="/editnews/:id"
            element={
              <ProtectedRoute>
                <EditNewsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/mynews"
            // 내가 쓴 뉴스 목록
            element={
              <ProtectedRoute>
                <MyNewsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/mycomments"
            // 내가 쓴 댓글 목록
            element={
              <ProtectedRoute>
                <MyComments />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<h2>404 - 페이지를 찾을 수 없습니다.</h2>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
