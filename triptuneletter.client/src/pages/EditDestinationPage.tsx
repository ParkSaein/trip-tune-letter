import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Paper, IconButton, MenuItem } from "@mui/material";
import { useAuth } from "react-oidc-context";
import { createDestination, getDestination, updateDestination, getImageUrl } from "../services/api";
import DeleteIcon from '@mui/icons-material/Delete';

const COUNTRIES = [
    { value: "KOREA", label: "대한민국" },
    { value: "JAPAN", label: "일본" },
    { value: "CHINA", label: "중국" },
    { value: "VIETNAM", label: "베트남" },
    { value: "USA", label: "미국" },
    { value: "FRANCE", label: "프랑스" },
    { value: "UK", label: "영국" },
    { value: "ITALY", label: "이탈리아" },
    { value: "SPAIN", label: "스페인" },
    { value: "GERMANY", label: "독일" },
];

const CITIES_BY_COUNTRY: Record<string, { value: string, label: string }[]> = {
    KOREA: [
        { value: "SEOUL", label: "서울" },
        { value: "BUSAN", label: "부산" },
        { value: "JEJU", label: "제주" },
        { value: "INCHEON", label: "인천" },
    ],
    JAPAN: [
        { value: "TOKYO", label: "도쿄" },
        { value: "OSAKA", label: "오사카" },
        { value: "FUKUOKA", label: "후쿠오카" },
        { value: "SAPPORO", label: "삿포로" },
    ],
    VIETNAM: [
        { value: "DANANG", label: "다낭" },
        { value: "HANOI", label: "하노이" },
        { value: "HO_CHI_MINH", label: "호치민" },
    ],
    USA: [
        { value: "NEW_YORK", label: "뉴욕" },
        { value: "LA", label: "LA" },
        { value: "HAWAII", label: "하와이" },
        { value: "GUAM", label: "괌" },
    ],
    FRANCE: [
        { value: "PARIS", label: "파리" },
        { value: "NICE", label: "니스" },
    ],
    UK: [
        { value: "LONDON", label: "런던" },
    ],
};

function EditDestinationPage() {
    const auth = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [city, setCity] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>([]);

    const loadDestination = useCallback(async () => {
        if (id) {
            try {
                const data = await getDestination(id);
                if (data) {
                    setName(data.name || "");
                    setLocation(data.location || "");
                    setDescription(data.description || "");
                    setCity(data.city || "");
                    setExistingImages(data.imageUrls || []);
                    
                    // City를 통해 Country 역추적 (간단히 하기 위해 CITIES_BY_COUNTRY 검색)
                    for (const countryCode in CITIES_BY_COUNTRY) {
                        if (CITIES_BY_COUNTRY[countryCode].some(c => c.value === data.city)) {
                            setSelectedCountry(countryCode);
                            break;
                        }
                    }
                }
            } catch (error) {
                console.error("Failed to load destination", error);
            }
        }
    }, [id]);

    useEffect(() => {
        if (isEdit) {
            loadDestination();
        }
    }, [isEdit, loadDestination]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFiles(prev => [...prev, ...Array.from(e.target.files!)]);
        }
    };

    const removeSelectedFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth.user?.access_token) return;

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("location", location);
            formData.append("description", description);
            if (city) {
                formData.append("city", city);
            }
            
            selectedFiles.forEach(file => {
                formData.append("files", file);
            });

            if (isEdit && id) {
                await updateDestination(id, formData, auth.user.access_token);
                alert("여행지가 수정되었습니다.");
            } else {
                await createDestination(formData, auth.user.access_token);
                alert("여행지가 등록되었습니다.");
            }
            navigate("/mydestinations");
        } catch (error) {
            console.error(error);
            alert("여행지 저장 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>{isEdit ? "여행지 수정" : "여행지 추가"}</Typography>
                <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField label="여행지명" value={name} onChange={e => setName(e.target.value)} required fullWidth />
                        <TextField label="위치" value={location} onChange={e => setLocation(e.target.value)} required fullWidth />
                        <TextField label="설명" value={description} onChange={e => setDescription(e.target.value)} multiline rows={4} fullWidth />
                        <Box display="flex" gap={2}>
                            <TextField
                                select
                                label="국가"
                                value={selectedCountry}
                                onChange={e => {
                                    const val = e.target.value as string;
                                    setSelectedCountry(val);
                                    setCity(""); // 나라가 바뀌면 도시 초기화
                                }}
                                fullWidth
                            >
                                <MenuItem value="">선택 안함</MenuItem>
                                {COUNTRIES.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                label="도시"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                fullWidth
                                disabled={!selectedCountry}
                            >
                                <MenuItem value="">선택 안함</MenuItem>
                                {selectedCountry && CITIES_BY_COUNTRY[selectedCountry]?.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        
                        <Typography variant="subtitle1" sx={{ mt: 2 }}>이미지 업로드</Typography>
                        <Button variant="outlined" component="label" fullWidth>
                            파일 선택
                            <input type="file" hidden multiple accept="image/*" onChange={handleFileChange} />
                        </Button>
                        
                        <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                            {existingImages.map((img, idx) => (
                                <Box key={`existing-${idx}`} position="relative" width={80} height={80}>
                                    <img src={getImageUrl(img, 'destinations')} alt="existing" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }} />
                                    <Typography variant="caption" sx={{ position: 'absolute', bottom: 0, left: 0, bgcolor: 'rgba(0,0,0,0.5)', color: 'white', width: '100%', textAlign: 'center' }}>기존</Typography>
                                </Box>
                            ))}
                            {selectedFiles.map((file, idx) => (
                                <Box key={`new-${idx}`} position="relative" width={80} height={80}>
                                    <img src={URL.createObjectURL(file)} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }} />
                                    <IconButton 
                                        size="small" 
                                        onClick={() => removeSelectedFile(idx)} 
                                        sx={{ position: 'absolute', top: -5, right: -5, bgcolor: 'error.main', color: 'white', '&:hover': { bgcolor: 'error.dark' } }}
                                    >
                                        <DeleteIcon fontSize="inherit" />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>

                        <Button type="submit" variant="contained" color="secondary" disabled={loading} size="large" sx={{ mt: 2 }}>
                            {loading ? "저장 중..." : "저장하기"}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
}

export default EditDestinationPage;
