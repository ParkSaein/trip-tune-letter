import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { useAuth } from 'react-oidc-context';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


interface HeadAppBarProps {
    onMenuClick: () => void;
    mode: "light" | "dark";
    onToggleMode: () => void;
}

const HeadAppBar: React.FC<HeadAppBarProps> = ({ onMenuClick, mode, onToggleMode }) => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={onMenuClick}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
                        TripTuneLetter
                    </Typography>

                    {auth.isAuthenticated ? (
                        <>
                            <Tooltip title="계정">
                                <IconButton
                                    aria-controls={anchorEl ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={anchorEl ? 'true' : undefined}
                                    onClick={(e) => setAnchorEl(prev => prev ? null : e.currentTarget)}
                                >
                                    <AccountCircleIcon />
                                </IconButton>
                            </Tooltip>

                            <Menu
                                id="account-menu"
                                anchorEl={anchorEl}
                                open={!!anchorEl}
                                onClose={() => setAnchorEl(null)}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            >
                                <MenuItem onClick={() => { setAnchorEl(null); navigate('/mynews'); }}>나의 계정</MenuItem>
                                <MenuItem onClick={() => {
                                    setAnchorEl(null);
                                    const returnPath = window.location.pathname + window.location.search + window.location.hash;
                                    try {
                                        // Save desired return path so we can navigate back after IdP signout
                                        localStorage.setItem('post_logout_path', returnPath);
                                    } catch { /* ignore */ }
                                    // Request redirect back to our app after signout
                                    auth.signoutRedirect({ extraQueryParams: { post_logout_redirect_uri: window.location.origin } });
                                }}>로그아웃</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => {
                                    auth.signinRedirect({
                                        extraQueryParams: {
                                            prompt: "create"
                                        }
                                    })
                                }}
                            >
                                계정가입
                            </Button>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => auth.signinRedirect()}
                            >
                                로그인
                            </Button>
                        </Stack>
                    )}

                    <IconButton color="inherit" onClick={onToggleMode}>
                        {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default HeadAppBar;
