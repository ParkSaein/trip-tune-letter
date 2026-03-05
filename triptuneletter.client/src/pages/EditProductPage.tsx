import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Paper, IconButton, MenuItem } from "@mui/material";
import { useAuth } from "react-oidc-context";
import { createProduct, getProduct, updateProduct, getImageUrl } from "../services/api";
import DeleteIcon from '@mui/icons-material/Delete';

const PRODUCT_CATEGORIES: Record<string, {
    label: string;
    middle: Record<string, {
        label: string;
        small: string[];
    }>;
}> = {
    ELECTRONICS: {
        label: "전자제품",
        middle: {
            HOME_APPLIANCES: { label: "가전제품", small: ["REFRIGERATOR", "WASHING_MACHINE", "VACUUM_CLEANER", "AIR_CONDITIONER"] },
            KITCHEN_APPLIANCES: { label: "주방가전", small: ["MICROWAVE", "RICE_COOKER", "COFFEE_MACHINE", "AIR_FRYER"] },
            DIGITAL_COMPUTER: { label: "디지털/컴퓨터", small: ["LAPTOP", "MONITOR", "KEYBOARD"] },
            MOBILE: { label: "모바일", small: ["SMARTPHONE", "SMARTWATCH", "TABLET", "POWER_BANK"] },
        }
    },
    FASHION: {
        label: "패션",
        middle: {
            MEN_CLOTHING: { label: "남성의류", small: ["MEN_TSHIRT", "MEN_PANTS", "MEN_SHIRT", "MEN_OUTER"] },
            WOMEN_CLOTHING: { label: "여성의류", small: ["WOMEN_DRESS", "WOMEN_SKIRT", "WOMEN_BLOUSE", "WOMEN_OUTER"] },
            ACCESSORIES: { label: "잡화/소품", small: ["HAT", "BELT", "WALLET", "WATCH"] },
            SHOES: { label: "신발", small: ["SNEAKERS", "DRESS_SHOES", "SANDALS", "BOOTS"] },
        }
    },
    FOOD: {
        label: "식품",
        middle: {
            FRESH_FOOD: { label: "신선식품", small: ["FRUITS", "VEGETABLES", "MEAT", "SEAFOOD"] },
            PROCESSED_FOOD: { label: "가공식품", small: ["RAMEN", "CANNED_FOOD", "SNACK", "BREAD"] },
            BEVERAGE: { label: "음료/커피", small: ["COFFEE_BEAN", "BOTTLED_WATER", "JUICE", "ALCOHOL"] },
        }
    },
    HOME: {
        label: "홈",
        middle: {
            FURNITURE: { label: "가구", small: ["BED", "SOFA", "TABLE", "DESK", "CHAIR"] },
            FABRIC: { label: "침구/패브릭", small: ["BEDDING", "CURTAIN", "CARPET"] },
        }
    }
};

const SMALL_LABELS: Record<string, string> = {
    REFRIGERATOR: "냉장고", WASHING_MACHINE: "세탁기", VACUUM_CLEANER: "청소기", AIR_CONDITIONER: "에어컨",
    MICROWAVE: "전자레인지", RICE_COOKER: "밥솥", COFFEE_MACHINE: "커피머신", AIR_FRYER: "에어프라이어",
    LAPTOP: "노트북", MONITOR: "모니터", KEYBOARD: "키보드",
    SMARTPHONE: "스마트폰", SMARTWATCH: "스마트워치", TABLET: "태블릿", POWER_BANK: "보조배터리",
    MEN_TSHIRT: "남성 티셔츠", MEN_PANTS: "남성 바지", MEN_SHIRT: "남성 셔츠", MEN_OUTER: "남성 아우터",
    WOMEN_DRESS: "여성 원피스", WOMEN_SKIRT: "여성 스커트", WOMEN_BLOUSE: "여성 블라우스", WOMEN_OUTER: "여성 아우터",
    HAT: "모자", BELT: "벨트", WALLET: "지갑", WATCH: "시계",
    SNEAKERS: "운동화", DRESS_SHOES: "구두", SANDALS: "샌들/슬리퍼", BOOTS: "부츠",
    FRUITS: "과일", VEGETABLES: "채소", MEAT: "육류", SEAFOOD: "수산물",
    RAMEN: "라면", CANNED_FOOD: "통조림", SNACK: "과자", BREAD: "빵/베이커리",
    COFFEE_BEAN: "원두", BOTTLED_WATER: "생수", JUICE: "주스", ALCOHOL: "주류",
    BED: "침대", SOFA: "소파", TABLE: "식탁", DESK: "책상", CHAIR: "의자"
};

function EditProductPage() {
    const auth = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [largeCategory, setLargeCategory] = useState("");
    const [middleCategory, setMiddleCategory] = useState("");
    const [category, setCategory] = useState(""); // This is SmallCategory
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>([]);

    const loadProduct = useCallback(async () => {
        if (id) {
            try {
                const data = await getProduct(id);
                if (data) {
                    setName(data.name || "");
                    setPrice(data.price?.toString() || "");
                    setDescription(data.description || "");
                    setCategory(data.smallCategory || "");
                    setExistingImages(data.imageUrls || []);
                    
                    // 카테고리 역추적 (중분류, 대분류 설정)
                    const smallCode = data.smallCategory;
                    if (smallCode) {
                        for (const lKey in PRODUCT_CATEGORIES) {
                            const lCat = PRODUCT_CATEGORIES[lKey];
                            for (const mKey in lCat.middle) {
                                const mCat = lCat.middle[mKey];
                                if (mCat.small.includes(smallCode)) {
                                    setLargeCategory(lKey);
                                    setMiddleCategory(mKey);
                                    setCategory(smallCode); // 폼 초기값 설정을 위해 명시적 호출
                                    return;
                                }
                            }
                        }
                    }
                }
            } catch (error) {
                console.error("Failed to load product", error);
            }
        }
    }, [id]);

    useEffect(() => {
        if (isEdit) {
            loadProduct();
        }
    }, [isEdit, loadProduct]);

    const handleLargeChange = (val: string) => {
        setLargeCategory(val);
        setMiddleCategory("");
        setCategory("");
    };

    const handleMiddleChange = (val: string) => {
        setMiddleCategory(val);
        setCategory("");
    };

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
            formData.append("price", price);
            formData.append("description", description || "");
            formData.append("smallCategory", category);
            
            selectedFiles.forEach(file => {
                formData.append("files", file);
            });

            if (isEdit && id) {
                await updateProduct(id, formData, auth.user.access_token);
                alert("상품이 수정되었습니다.");
            } else {
                await createProduct(formData, auth.user.access_token);
                alert("상품이 등록되었습니다.");
            }
            navigate("/myproducts");
        } catch (error) {
            console.error(error);
            alert("상품 저장 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>{isEdit ? "상품 수정" : "상품 추가"}</Typography>
                <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField label="상품명" value={name || ""} onChange={e =>setName(e.target.value)} required fullWidth slotProps={{ htmlInput: { maxLength: 100 } }} />
                        <TextField label="가격" type="number" value={price || ""} onChange={e => setPrice(e.target.value)} required fullWidth />
                        <TextField label="설명" value={description || ""} onChange={e => setDescription(e.target.value)} multiline rows={4} fullWidth />
                        <Box display="flex" gap={2}>
                            <TextField
                                select
                                label="대분류"
                                value={largeCategory || ""}
                                onChange={e => handleLargeChange(e.target.value)}
                                fullWidth
                                SelectProps={{
                                    displayEmpty: true
                                }}
                            >
                                <MenuItem key="large-default" value="">선택</MenuItem>
                                {Object.entries(PRODUCT_CATEGORIES).map(([key, cat]) => (
                                    <MenuItem key={key} value={key}>{cat.label}</MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                label="중분류"
                                value={middleCategory || ""}
                                onChange={e => handleMiddleChange(e.target.value)}
                                fullWidth
                                disabled={!largeCategory}
                                SelectProps={{
                                    displayEmpty: true
                                }}
                            >
                                <MenuItem key="middle-default" value="">선택</MenuItem>
                                {largeCategory && PRODUCT_CATEGORIES[largeCategory]?.middle && Object.entries(PRODUCT_CATEGORIES[largeCategory].middle).map(([key, cat]) => (
                                    <MenuItem key={key} value={key}>{cat.label}</MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                label="소분류"
                                value={category || ""}
                                onChange={e => setCategory(e.target.value)}
                                fullWidth
                                disabled={!middleCategory}
                                required
                                SelectProps={{
                                    displayEmpty: true
                                }}
                            >
                                <MenuItem key="small-default" value="">선택</MenuItem>
                                {largeCategory && middleCategory && PRODUCT_CATEGORIES[largeCategory]?.middle?.[middleCategory]?.small?.map((sKey: string) => (
                                    <MenuItem key={sKey} value={sKey}>{SMALL_LABELS[sKey] || sKey}</MenuItem>
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
                                    <img src={getImageUrl(img, 'products')} alt="existing" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }} />
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

                        <Button type="submit" variant="contained" color="primary" disabled={loading} size="large" sx={{ mt: 2 }}>
                            {loading ? "저장 중..." : "저장하기"}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
}

export default EditProductPage;
