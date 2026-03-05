import { useEffect, useState, useCallback } from "react";
import { Container, Grid, Card, CardContent, CardMedia, Typography, Box, Button, CardActions } from "@mui/material";
import { getMyDestinations, getImageUrl, deleteDestination } from "../services/api";
import type { TravelDestinationResponse } from "../services/data";
import { useAuth } from "react-oidc-context";
import LandscapeIcon from "@mui/icons-material/Landscape";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

function MyDestinationsPage() {
    const [destinations, setDestinations] = useState<TravelDestinationResponse[]>([]);
    const auth = useAuth();
    const navigate = useNavigate();

    const loadMyDestinations = useCallback(async () => {
        if (auth.user?.access_token) {
            const data = await getMyDestinations(auth.user.access_token);
            setDestinations(data);
        }
    }, [auth.user]);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            if (auth.user?.access_token) {
                const data = await getMyDestinations(auth.user.access_token);
                if (isMounted) setDestinations(data);
            }
        };
        fetchData();
        return () => { isMounted = false; };
    }, [auth.user]);

    const handleDelete = async (id: string) => {
        if (!auth.user?.access_token) return;
        if (window.confirm("정말 이 여행지를 삭제하시겠습니까?")) {
            try {
                await deleteDestination(id, auth.user.access_token);
                alert("여행지가 삭제되었습니다.");
                loadMyDestinations();
            } catch (error) {
                console.error(error);
                alert("삭제 중 오류가 발생했습니다.");
            }
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4">내가 등록한 여행지</Typography>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    startIcon={<AddIcon />}
                    onClick={() => navigate("/editdestination")}
                >
                    여행지 추가
                </Button>
            </Box>

            <Grid container spacing={3}>
                {destinations.length === 0 ? (
                    <Grid size={12}>
                        <Typography variant="body1" color="text.secondary" textAlign="center" py={10}>
                            등록된 여행지가 없습니다.
                        </Typography>
                    </Grid>
                ) : (
                    destinations.map(d => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={d.id}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                                {d.imageUrls && d.imageUrls.length > 0 ? (
                                    <CardMedia component="img" image={getImageUrl(d.imageUrls[0], 'destinations')} height="200" />
                                ) : (
                                    <Box height="200" display="flex" alignItems="center" justifyContent="center">
                                        <LandscapeIcon sx={{ fontSize: 60, color: 'text.secondary' }} />
                                    </Box>
                                )}
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" gutterBottom>{d.name}</Typography>
                                    <Typography variant="subtitle2" color="secondary" gutterBottom>
                                        {d.location}
                                    </Typography>
                                    <Typography variant="body2" mt={1} sx={{ 
                                        overflow: 'hidden', 
                                        textOverflow: 'ellipsis', 
                                        display: '-webkit-box', 
                                        WebkitLineClamp: 2, 
                                        WebkitBoxOrient: 'vertical',
                                        color: 'text.secondary'
                                    }}>
                                        {d.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" variant="contained" color="secondary" startIcon={<EditIcon />} onClick={() => navigate(`/editdestination/${d.id}`)}>
                                        수정
                                    </Button>
                                    <Button size="small" color="error" variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(d.id!)}>
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

export default MyDestinationsPage;
