import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { getAllNews, searchNews, getImageUrl } from "../services/api";
import type { NewsResponse } from "../services/data";
import NewspaperIcon from '@mui/icons-material/Newspaper';

function HomePage() {
  const [news, setNews] = useState<NewsResponse[]>([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const load = async () => {
    if (query.trim()) {
      const res = await searchNews(query.trim());
      setNews(res);
    } else {
      const res = await getAllNews();
      setNews(res);
    }
  };

  useEffect(() => {
    const doLoad = async () => {
      if (query.trim()) {
        const res = await searchNews(query.trim());
        setNews(res);
      } else {
        const res = await getAllNews();
        setNews(res);
      }
    };
    doLoad();
  }, [query]);

  return (
    <Container sx={{ mt: 4 }}>
      <Box display="flex" gap={2} mb={2}>
        <TextField fullWidth placeholder="검색어로 뉴스 검색" value={query} onChange={(e)=>setQuery(e.target.value)} />
        <Button variant="contained" onClick={()=>load()}>검색</Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        {news.map(n => (
          <Card key={n.id} sx={{ display: 'flex', cursor: 'pointer', alignItems: 'stretch' }} onClick={() => navigate(`/news/${n.id}`)}>
            <Box sx={{ width: 160, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'background.default' }}>
              {n.imageUrls && n.imageUrls.length > 0 ? (
                <CardMedia component="img" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} image={getImageUrl(n.imageUrls[0])} />
              ) : (
                <NewspaperIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
              )}
            </Box>
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6">{n.title}</Typography>
              <Typography variant="body2" color="text.secondary">{n.userName} • {new Date(n.createdAt).toLocaleString()}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box> 
    </Container>
  );
}

export default HomePage;