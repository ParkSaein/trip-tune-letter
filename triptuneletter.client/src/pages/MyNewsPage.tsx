import { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getMyNews, deleteNews } from "../services/api";
import type { NewsResponse } from "../services/data";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

function MyNewsPage(){
  const [list, setList] = useState<NewsResponse[]>([]);
  const auth = useAuth();
  const nav = useNavigate();

  const load = async () => {
    if (!auth.user) return;
    const res = await getMyNews(auth.user.access_token!);
    setList(res);
  };

  useEffect(() => {
    const doLoad = async () => {
      if (!auth.user) return;
      const res = await getMyNews(auth.user.access_token!);
      setList(res);
    };
    doLoad();
  }, [auth.user]);

  const doDelete = async (id?: string) => {
    if (!id || !auth.user) return;
    await deleteNews(id, auth.user.access_token!);
    await load();
  };

  return (
    <Container sx={{ mt:4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">내가 작성한 뉴스</Typography>
        <Box>
          {auth.isAuthenticated ? (
            <Button variant="contained" onClick={() => nav('/editnews')}>작성</Button>
          ) : (
            <Button variant="contained" onClick={() => auth.signinRedirect()}>작성 (로그인)</Button>
          )}
        </Box>
      </Box>

      <List>
        {list.length === 0 ? (
          <Typography color="text.secondary">작성한 뉴스가 없습니다.</Typography>
        ) : (
          list.map(n => (
            <ListItem key={n.id} secondaryAction={
              <Box>
                <Button onClick={()=>nav(`/news/${n.id}`)} sx={{ mr:1 }}>뉴스로</Button>
                <Button onClick={()=>nav(`/editnews/${n.id}`)} sx={{ mr:1 }}>수정</Button>
                <Button color="error" onClick={()=>doDelete(n.id)}>삭제</Button>
              </Box>
            }>
              <ListItemText primary={n.title} secondary={`${n.userName} • ${new Date(n.createdAt).toLocaleString()}`} />
            </ListItem>
          ))
        )}
      </List>
    </Container>
  );
}

export default MyNewsPage;