import { useState } from "react";
import { useAuth } from "react-oidc-context";
import { Container, TextField, Button, Box, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";
import { chatWithGemini } from "../services/api";

function ChatPage() {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([]);
  const [input, setInput] = useState("");
  const auth = useAuth();

  const handleSend = async () => {
    if (!input.trim() || !auth.user) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput("");

    try {
      const resp = await chatWithGemini(userMsg, auth.user.access_token!);
      setMessages(prev => [...prev, { role: 'bot', text: resp }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'bot', text: "메시지를 보내는 데 실패했습니다." }]);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" mb={2}>AI 여행 상담사 (Gemini)</Typography>
      <Paper elevation={3} sx={{ p: 2, height: '60vh', overflowY: 'auto', mb: 2 }}>
        <List>
          {messages.map((m, i) => (
            <ListItem key={i} sx={{ justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <Paper variant="outlined" sx={{ p: 1, bgcolor: m.role === 'user' ? 'primary.light' : 'background.paper', maxWidth: '80%' }}>
                <ListItemText primary={m.text} />
              </Paper>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box display="flex" gap={1}>
        <TextField fullWidth value={input} onChange={e => setInput(e.target.value)} placeholder="궁금한 것을 물어보세요" onKeyPress={e => e.key === 'Enter' && handleSend()} />
        <Button variant="contained" onClick={handleSend} disabled={!auth.isAuthenticated}>전송</Button>
      </Box>
      {!auth.isAuthenticated && (
          <Typography color="error" variant="caption">로그인이 필요합니다.</Typography>
      )}
    </Container>
  );
}

export default ChatPage;
