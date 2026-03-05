import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
    Container, Typography, Box, Grid, 
    Divider, TextField, Button, List, ListItem, ListItemText, IconButton 
} from "@mui/material";
import { 
    getProduct, getCommentsByProduct, addProductComment, getImageUrl 
} from "../services/api";
import type { ProductResponse, ProductCommentResponse } from "../services/data";
import { useAuth } from "react-oidc-context";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<ProductResponse | null>(null);
    const [comments, setComments] = useState<ProductCommentResponse[]>([]);
    const [commentContent, setCommentContent] = useState("");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const auth = useAuth();

    useEffect(() => {
        const loadData = async () => {
            if (!id) return;
            try {
                const p = await getProduct(id);
                setProduct(p);
                const c = await getCommentsByProduct(id);
                setComments(c);
            } catch (error) {
                console.error("Failed to load product details", error);
            }
        };
        loadData();
    }, [id]);

    const handleBack = () => {
        navigate("/products");
    };

    const handleAddComment = async () => {
        if (!auth.isAuthenticated) {
            auth.signinRedirect();
            return;
        }
        if (!id || !commentContent.trim()) return;
        
        try {
            await addProductComment(
                { productId: id, content: commentContent }, 
                auth.user?.access_token || ""
            );
            setCommentContent("");
            setComments(await getCommentsByProduct(id));
        } catch (error) {
            console.error("Failed to add comment", error);
        }
    };

    const nextImage = () => {
        if (product && product.imageUrls && product.imageUrls.length > 0) {
            setCurrentImageIndex((prev) => (prev + 1) % product.imageUrls.length);
        }
    };

    const prevImage = () => {
        if (product && product.imageUrls && product.imageUrls.length > 0) {
            setCurrentImageIndex((prev) => (prev - 1 + product.imageUrls.length) % product.imageUrls.length);
        }
    };

    if (!product) return <Container sx={{ mt: 4 }}>로딩 중...</Container>;

    return (
        <Container sx={{ mt: 4, mb: 8 }}>
            <Button startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ mb: 2 }}>
                목록으로 돌아가기
            </Button>

            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 6 }}>
                    {product.imageUrls && product.imageUrls.length > 0 ? (
                        <Box sx={{ position: 'relative', width: '100%', height: 400, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                            <Box
                                component="img"
                                src={getImageUrl(product.imageUrls[currentImageIndex], 'products')}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                }}
                            />
                            {product.imageUrls.length > 1 && (
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
                                        {currentImageIndex + 1} / {product.imageUrls.length}
                                    </Box>
                                </>
                            )}
                        </Box>
                    ) : (
                        <Box height={400} display="flex" alignItems="center" justifyContent="center" bgcolor="rgba(0,0,0,0.05)" borderRadius={2}>
                            <ShoppingBagIcon sx={{ fontSize: 100, color: 'text.secondary' }} />
                        </Box>
                    )}
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h4" gutterBottom>{product.name}</Typography>
                    <Typography variant="h5" color="primary" gutterBottom>
                        {product.price.toLocaleString()}원
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        판매자: {product.userName}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                        {product.description}
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

export default ProductDetailPage;
