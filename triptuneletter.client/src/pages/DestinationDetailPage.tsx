import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
    Container, Typography, Box, Grid, Divider, 
    TextField, Button, List, ListItem, ListItemText, IconButton 
} from "@mui/material";
import { 
    getDestination, getCommentsByDestination, addTravelDestinationComment, getImageUrl 
} from "../services/api";
import type { TravelDestinationResponse, TravelDestinationCommentResponse } from "../services/data";
import { useAuth } from "react-oidc-context";
import MapIcon from "@mui/icons-material/Map";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function DestinationDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [destination, setDestination] = useState<TravelDestinationResponse | null>(null);
    const [comments, setComments] = useState<TravelDestinationCommentResponse[]>([]);
    const [commentContent, setCommentContent] = useState("");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const auth = useAuth();

    useEffect(() => {
        const loadData = async () => {
            if (!id) return;
            try {
                const d = await getDestination(id);
                setDestination(d);
                const c = await getCommentsByDestination(id);
                setComments(c);
            } catch (error) {
                console.error("Failed to load destination details", error);
            }
        };
        loadData();
    }, [id]);

    const handleBack = () => {
        navigate("/destinations");
    };

    const handleAddComment = async () => {
        if (!auth.isAuthenticated) {
            auth.signinRedirect();
            return;
        }
        if (!id || !commentContent.trim()) return;
        
        try {
            await addTravelDestinationComment(
                { travelDestinationId: id, content: commentContent }, 
                auth.user?.access_token || ""
            );
            setCommentContent("");
            setComments(await getCommentsByDestination(id));
        } catch (error) {
            console.error("Failed to add comment", error);
        }
    };

    const nextImage = () => {
        if (destination && destination.imageUrls && destination.imageUrls.length > 0) {
            setCurrentImageIndex((prev) => (prev + 1) % destination.imageUrls.length);
        }
    };

    const prevImage = () => {
        if (destination && destination.imageUrls && destination.imageUrls.length > 0) {
            setCurrentImageIndex((prev) => (prev - 1 + destination.imageUrls.length) % destination.imageUrls.length);
        }
    };

    if (!destination) return <Container sx={{ mt: 4 }}>로딩 중...</Container>;

    return (
        <Container sx={{ mt: 4, mb: 8 }}>
            <Button startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ mb: 2 }}>
                목록으로 돌아가기
            </Button>

            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 6 }}>
                    {destination.imageUrls && destination.imageUrls.length > 0 ? (
                        <Box sx={{ position: 'relative', width: '100%', height: 400, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                            <Box
                                component="img"
                                src={getImageUrl(destination.imageUrls[currentImageIndex], 'destinations')}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                }}
                            />
                            {destination.imageUrls.length > 1 && (
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
                                    <Box sx={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', bgcolor: 'rgba(0,0,0,0.5)', color: 'white', px: 1, borderRadius: 1 }}>
                                        {currentImageIndex + 1} / {destination.imageUrls.length}
                                    </Box>
                                </>
                            )}
                        </Box>
                    ) : (
                        <Box height={400} display="flex" alignItems="center" justifyContent="center" bgcolor="rgba(0,0,0,0.05)" borderRadius={2}>
                            <MapIcon sx={{ fontSize: 100, color: 'text.secondary' }} />
                        </Box>
                    )}
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h4" gutterBottom>{destination.name}</Typography>
                    <Typography variant="h6" color="secondary" gutterBottom>
                        {destination.location}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        작성자: {destination.userName}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                        {destination.description}
                    </Typography>
                </Grid>
            </Grid>

            <Box mt={6}>
                <Typography variant="h5" gutterBottom>댓글 ({comments.length})</Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Box mb={4}>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        placeholder="댓글을 입력하세요"
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        sx={{ mb: 1 }}
                    />
                    <Box display="flex" justifyContent="flex-end">
                        <Button variant="contained" onClick={handleAddComment}>
                            댓글 등록
                        </Button>
                    </Box>
                </Box>

                <List>
                    {comments.map((comment) => (
                        <Box key={comment.id}>
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary={comment.userName}
                                    secondary={
                                        <>
                                            <Typography component="span" variant="body2" color="text.primary">
                                                {comment.content}
                                            </Typography>
                                            <br />
                                            {new Date(comment.createdAt).toLocaleString()}
                                        </>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </Box>
                    ))}
                    {comments.length === 0 && (
                        <Typography color="text.secondary">아직 댓글이 없습니다.</Typography>
                    )}
                </List>
            </Box>
        </Container>
    );
}

export default DestinationDetailPage;
