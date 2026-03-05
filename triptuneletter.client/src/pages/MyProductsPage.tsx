import { useEffect, useState, useCallback } from "react";
import { Container, Grid, Card, CardContent, CardMedia, Typography, Box, Button, CardActions } from "@mui/material";
import { getMyProducts, getImageUrl, deleteProduct } from "../services/api";
import type { ProductResponse } from "../services/data";
import { useAuth } from "react-oidc-context";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

function MyProductsPage() {
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const auth = useAuth();
    const navigate = useNavigate();

    const loadMyProducts = useCallback(async () => {
        if (auth.user?.access_token) {
            const data = await getMyProducts(auth.user.access_token);
            setProducts(data);
        }
    }, [auth.user]);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            if (auth.user?.access_token) {
                const data = await getMyProducts(auth.user.access_token);
                if (isMounted) setProducts(data);
            }
        };
        fetchData();
        return () => { isMounted = false; };
    }, [auth.user]);

    const handleDelete = async (id: string) => {
        if (!auth.user?.access_token) return;
        if (window.confirm("정말 이 상품을 삭제하시겠습니까?")) {
            try {
                await deleteProduct(id, auth.user.access_token);
                alert("상품이 삭제되었습니다.");
                loadMyProducts();
            } catch (error) {
                console.error(error);
                alert("삭제 중 오류가 발생했습니다.");
            }
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4">내가 등록한 상품</Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<AddIcon />}
                    onClick={() => navigate("/editproduct")}
                >
                    상품 추가
                </Button>
            </Box>

            <Grid container spacing={3}>
                {products.length === 0 ? (
                    <Grid size={12}>
                        <Typography variant="body1" color="text.secondary" textAlign="center" py={10}>
                            등록된 상품이 없습니다.
                        </Typography>
                    </Grid>
                ) : (
                    products.map(p => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p.id}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                                {p.imageUrls && p.imageUrls.length > 0 ? (
                                    <CardMedia component="img" image={getImageUrl(p.imageUrls[0], 'products')} height="200" />
                                ) : (
                                    <Box height="200" display="flex" alignItems="center" justifyContent="center">
                                        <ShoppingBagIcon sx={{ fontSize: 60, color: 'text.secondary' }} />
                                    </Box>
                                )}
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" gutterBottom>{p.name}</Typography>
                                    <Typography color="primary" variant="subtitle1" fontWeight="bold">
                                        {p.price.toLocaleString()}원
                                    </Typography>
                                    <Typography variant="body2" mt={1} sx={{ 
                                        overflow: 'hidden', 
                                        textOverflow: 'ellipsis', 
                                        display: '-webkit-box', 
                                        WebkitLineClamp: 2, 
                                        WebkitBoxOrient: 'vertical',
                                        color: 'text.secondary'
                                    }}>
                                        {p.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" variant="contained" startIcon={<EditIcon />} onClick={() => navigate(`/editproduct/${p.id}`)}>
                                        수정
                                    </Button>
                                    <Button size="small" color="error" variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(p.id!)}>
                                        삭제
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </Container>
    );
}

export default MyProductsPage;
