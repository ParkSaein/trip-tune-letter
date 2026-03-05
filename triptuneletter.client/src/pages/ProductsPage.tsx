import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Card, CardContent, CardMedia, Typography, TextField, Button, Box, CardActionArea } from "@mui/material";
import { getAllProducts, searchProducts, recommendProducts, getImageUrl } from "../services/api";
import type { ProductResponse } from "../services/data";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

function ProductsPage() {
    const navigate = useNavigate();
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [query, setQuery] = useState("");
    const [sentence, setSentence] = useState("");

    const doLoad = useCallback(async () => {
        const q = query.trim();
        const s = sentence.trim();
        if (q) {
            setProducts(await searchProducts(q));
        } else if (s) {
            setProducts(await recommendProducts(s));
        } else {
            setProducts(await getAllProducts());
        }
    }, [query, sentence]);

    useEffect(() => {
        let isMounted = true;
        const delay = (query.trim() || sentence.trim()) ? 500 : 0;
        const timer = setTimeout(async () => {
            const q = query.trim();
            const s = sentence.trim();
            let data;
            if (q) data = await searchProducts(q);
            else if (s) data = await recommendProducts(s);
            else data = await getAllProducts();

            if (isMounted) setProducts(data);
        }, delay);

        return () => {
            isMounted = false;
            clearTimeout(timer);
        };
    }, [query, sentence]);

    return (
        <Container sx={{ mt: 4 }}>
            <Box mb={4}>
                <Typography variant="h4" gutterBottom>마켓 (상품 목록)</Typography>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth placeholder="검색어로 상품 검색" value={query} onChange={e => { setQuery(e.target.value); setSentence(""); }} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField fullWidth placeholder="자연어로 상품 추천받기" value={sentence} onChange={e => { setSentence(e.target.value); setQuery(""); }} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                        <Button variant="contained" fullWidth sx={{ height: '100%' }} onClick={doLoad}>검색/추천</Button>
                    </Grid>
                </Grid>
            </Box>

            <Grid container spacing={3}>
                {products.map(p => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p.id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardActionArea onClick={() => navigate(`/products/${p.id}`)} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                                {p.imageUrls && p.imageUrls.length > 0 ? (
                                    <CardMedia component="img" image={getImageUrl(p.imageUrls[0], 'products')} height="200" />
                                ) : (
                                    <Box height="200" display="flex" alignItems="center" justifyContent="center">
                                        <ShoppingBagIcon sx={{ fontSize: 60, color: 'text.secondary' }} />
                                    </Box>
                                )}
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6">{p.name}</Typography>
                                    <Typography color="primary">{p.price.toLocaleString()}원</Typography>
                                    <Typography variant="caption" color="text.secondary">{p.userName}</Typography>
                                    <Typography variant="body2" mt={1} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                        {p.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default ProductsPage;
