import React from "react";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Link } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { 
    Home as HomeIcon, 
    Newspaper as NewsIcon, 
    ShoppingBag as ProductIcon, 
    Map as TravelIcon, 
    Chat as ChatIcon, 
    Inventory as MyProductIcon,
    Explore as MyTravelIcon
} from "@mui/icons-material";

interface NavMenuProps {
    open: boolean;
    onClose: () => void;
}

const NavMenu: React.FC<NavMenuProps> = ({ open, onClose }) => {
    const auth = useAuth();
    const roles: string[] = (auth.user?.profile as { realm_access?: { roles?: string[] } })?.realm_access?.roles || [];
    
    const isManager = roles.some(role => typeof role === 'string' && role.toUpperCase() === "MANAGER");

    const menuItems = [
        { text: "Home", path: "/", icon: <HomeIcon /> },
        { text: "News", path: "/", icon: <NewsIcon /> },
        { text: "Products", path: "/products", icon: <ProductIcon /> },
        { text: "Destinations", path: "/destinations", icon: <TravelIcon /> },
        { text: "Chat", path: "/chat", icon: <ChatIcon /> },
        ...(isManager ? [
            { text: "My Products", path: "/myproducts", icon: <MyProductIcon /> },
            { text: "My Destinations", path: "/mydestinations", icon: <MyTravelIcon /> },
        ] : []),
        { text: "My News", path: "/mynews" },
        { text: "My Comments", path: "/mycomments" },
    ];

    return (
        <Drawer
            open={open}
            onClose={onClose}
            anchor="left"
            slotProps={{
                paper: {
                    sx: {
                        width: 280,
                        borderRadius: "0 12px 12px 0",
                        bgcolor: "background.paper",
                        boxShadow: 3,
                        Elevation: 3
                    },
                },
            }}
        >
            <Box
                onClick={onClose}
                role="presentation" >
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton component={Link} to={item.path}>
                                <ListItemIcon
                                    sx={{ color: "primary.main" }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    slotProps={{
                                        primary: {
                                            variant: "body1",
                                            sx: { fontWeight: 500 },
                                        },
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default NavMenu;
