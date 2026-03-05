import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Card, CardContent, CardMedia, Typography, TextField, Button, Box, CardActionArea } from "@mui/material";
import { getAllDestinations, searchDestinations, recommendDestinations, getImageUrl } from "../services/api";
import type { TravelDestinationResponse } from "../services/data";
import MapIcon from "@mui/icons-material/Map";

function DestinationsPage() {
    const navigate = useNavigate();
    const [destinations, setDestinations] = useState<TravelDestinationResponse[]>([]);
    const [query, setQuery] = useState("");
    const [sentence, setSentence] = useState("");

    const doLoad = useCallback(async () => {
        const q = query.trim();
        const s = sentence.trim();
        if (q) {
            setDestinations(await searchDestinations(q));
        } else if (s) {
            setDestinations(await recommendDestinations(s));
        } else {
            setDestinations(await getAllDestinations());
        }
    }, [query, sentence]);

    useEffect(() => {
        let isMounted = true;
        const delay = (query.trim() || sentence.trim()) ? 500 : 0;
        const timer = setTimeout(async () => {
            const q = query.trim();
            const s = sentence.trim();
            let data;
            if (q) data = await searchDestinations(q);
            else if (s) data = await recommendDestinations(s);
            else data = await getAllDestinations();

            if (isMounted) setDestinations(data);
        }, delay);

        return () => {
            isMounted = false;
            clearTimeout(timer);
        };
    }, [query, sentence]);

    return (
        <Container sx={{ mt: 4 }}>
            <Box mb={4}>
                <Typography variant="h4" gutterBottom>추천 여행지</Typography>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth placeholder="검색어로 여행지 검색" value={query} onChange={e => { setQuery(e.target.value); setSentence(""); }} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField fullWidth placeholder="자연어로 여행지 추천받기" value={sentence} onChange={e => { setSentence(e.target.value); setQuery(""); }} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                        <Button variant="contained" fullWidth sx={{ height: '100%' }} onClick={doLoad}>검색/추천</Button>
                    </Grid>
                </Grid>
            </Box>

            <Grid container spacing={3}>
                {destinations.map(d => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={d.id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardActionArea onClick={() => navigate(`/destinations/${d.id}`)} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                                {d.imageUrls && d.imageUrls.length > 0 ? (
                                    <CardMedia component="img" image={getImageUrl(d.imageUrls[0], 'destinations')} height="200" />
                                ) : (
                                    <Box height="200" display="flex" alignItems="center" justifyContent="center">
                                        <MapIcon sx={{ fontSize: 60, color: 'text.secondary' }} />
                                    </Box>
                                )}
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6">{d.name}</Typography>
                                    <Typography variant="subtitle2" color="secondary">{d.location}</Typography>
                                    <Typography variant="caption" color="text.secondary">{d.userName}</Typography>
                                    <Typography variant="body2" mt={1} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                        {d.description}
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

export default DestinationsPage;
