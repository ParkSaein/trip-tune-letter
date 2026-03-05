import { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { getMyNewsComments, deleteNewsComment } from "../services/api";
import type { CommentResponse } from "../services/data";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

function MyComments(){
  const [list, setList] = useState<CommentResponse[]>([]);
  const auth = useAuth();
  const nav = useNavigate();

  const load = async () => {
    if (!auth.user) return;
    const res = await getMyNewsComments(auth.user.access_token!);
    setList(res);
  };

  useEffect(() => {
    const doLoad = async () => {
      if (!auth.user) return;
      const res = await getMyNewsComments(auth.user.access_token!);
      setList(res);
    };
    doLoad();
  }, [auth.user]);

  const doDelete = async (id?: string) => {
    if (!id || !auth.user) return;
    await deleteNewsComment(id, auth.user.access_token!);
    await load();
  };

  return (
    <Container sx={{ mt:4 }}>
      <List>
        {list.map(c => (
          <ListItem key={c.id} secondaryAction={
            <Box>
              <Button disabled={!c.newsId} onClick={() => c.newsId && nav(`/news/${c.newsId}`)} sx={{ mr:1 }}>뉴스로</Button>
              <Button color="error" onClick={()=>doDelete(c.id)}>삭제</Button>
            </Box>
          }>
            <ListItemText primary={c.content} secondary={`${c.userName} • ${new Date(c.createdAt).toLocaleString()}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default MyComments;