import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { createNews, updateNews, getNews } from "../services/api";
import { useAuth } from "react-oidc-context";

function EditNewsPage(){
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const auth = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (!id) return;
    (async () => {
      const n = await getNews(id);
      setTitle(n.title);
      setContent(n.content);
    })();
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles);
      setFiles(prev => [...prev, ...newFiles]);

      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!auth.user) {
      auth.signinRedirect();
      return;
    }
    const fd = new FormData();
    fd.append('title', title);
    fd.append('content', content);
    
    files.forEach(file => {
      fd.append('files', file);
    });

    if (id) {
      await updateNews(id, fd, auth.user.access_token!);
      nav(`/news/${id}`);
    } else {
      const createdId = await createNews(fd, auth.user.access_token!);
      nav(`/news/${createdId}`);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <TextField label="제목" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mb: 2 }} />
      <TextField label="내용" fullWidth multiline rows={10} value={content} onChange={(e) => setContent(e.target.value)} sx={{ mb: 2 }} />
      
      <Box mb={2}>
        <Button variant="outlined" component="label">
          이미지 선택 (여러 개 가능)
          <input type="file" hidden multiple onChange={handleFileChange} accept="image/*" />
        </Button>
      </Box>

      {previews.length > 0 && (
        <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
          {previews.map((url, index) => (
            <Box
              key={index}
              sx={{ position: 'relative', width: 100, height: 100 }}
            >
              <Box
                component="img"
                src={url}
                sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 1 }}
              />
              <IconButton
                size="small"
                onClick={() => removeFile(index)}
                sx={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  bgcolor: 'background.paper',
                  color: 'error.main',
                  '&:hover': { bgcolor: 'error.light', color: 'white' },
                  boxShadow: 1,
                  padding: 0
                }}
              >
                <RemoveCircleIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" onClick={handleSubmit} disabled={!title || !content}>
          {id ? "수정" : "생성"}
        </Button>
      </Box>
    </Container>
  );
}

export default EditNewsPage;