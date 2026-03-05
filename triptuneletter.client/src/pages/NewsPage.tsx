import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getNews, getCommentsByNews, addNewsComment, summarizeNews, getImageUrl } from "../services/api";
import type { NewsResponse, NewsCommentResponse } from "../services/data";
import { useAuth } from "react-oidc-context";

function NewsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsResponse | null>(null);
  const [comments, setComments] = useState<NewsCommentResponse[]>([]);
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const auth = useAuth();

  useEffect(() => {
    const doLoad = async () => {
      if (!id) return;
      const n = await getNews(id);
      setNews(n);
      setComments(await getCommentsByNews(id));
    };
    doLoad();
  }, [id]);

  const submitComment = async () => {
    if (!auth.user) {
      auth.signinRedirect();
      return;
    }
    if (!id) return;
    await addNewsComment({ newsId: id, content }, auth.user.access_token!);
    setContent("");
    setComments(await getCommentsByNews(id));
  };

  const doSummarize = async () => {
    if (!id) return;
    if (!auth.user) {
      auth.signinRedirect();
      return;
    }
    const s = await summarizeNews(id, auth.user.access_token!);
    setSummary(s);
  };

  const nextImage = () => {
    if (news && news.imageUrls.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % news.imageUrls.length);
    }
  };

  const prevImage = () => {
    if (news && news.imageUrls.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + news.imageUrls.length) % news.imageUrls.length);
    }
  };

  if (!news) return <Container sx={{ mt:4 }}>로딩 중...</Container>;

  return (
    <Container sx={{ mt:4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/")} sx={{ mb: 2 }}>
        홈으로 돌아가기
      </Button>
      <Typography variant="h4">{news.title}</Typography>
      <Typography variant="subtitle2" color="text.secondary">{news.userName} • {new Date(news.createdAt).toLocaleString()}</Typography>

      {news.imageUrls && news.imageUrls.length > 0 && (
        <Box my={2} sx={{ position: 'relative', width: '100%', height: 400, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 2, overflow: 'hidden' }}>
          <Box
            component="img"
            src={getImageUrl(news.imageUrls[currentImageIndex], 'news')}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
          {news.imageUrls.length > 1 && (
            <>
              <IconButton
                onClick={prevImage}
                sx={{
                  position: 'absolute',
                  left: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(255,255,255,0.7)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                }}
              >
                <NavigateBeforeIcon />
              </IconButton>
              <IconButton
                onClick={nextImage}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(255,255,255,0.7)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                }}
              >
                <NavigateNextIcon />
              </IconButton>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  bgcolor: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: '0.75rem'
                }}
              >
                {currentImageIndex + 1} / {news.imageUrls.length}
              </Box>
            </>
          )}
        </Box>
      )}

      <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{news.content}</Typography>

      <Box mt={3} mb={2}>
        <Button variant="outlined" onClick={doSummarize}>요약하기</Button>
        {summary && <Typography mt={1} variant="body2" color="text.secondary">요약: {summary}</Typography>}
      </Box>

      <Divider sx={{ my:2 }} />

      <Typography variant="h6">댓글</Typography>
      <List>
        {comments.map(c => (
          <ListItem key={c.id} alignItems="flex-start">
            <ListItemText primary={c.userName} secondary={<span>{c.content}<br/><small>{new Date(c.createdAt).toLocaleString()}</small></span>} />
          </ListItem>
        ))}
      </List>

      <Box mt={2}>
        <TextField fullWidth multiline rows={3} value={content} onChange={(e)=>setContent(e.target.value)} placeholder="댓글을 입력하세요" />
        <Box mt={1} display="flex" justifyContent="flex-end">
          <Button variant="contained" onClick={submitComment}>댓글 달기</Button>
        </Box>
      </Box>
    </Container>
  );
}

export default NewsPage;