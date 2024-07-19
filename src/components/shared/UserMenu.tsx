import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import {
    AccountCircle,
    Brightness7,
    Brightness4,
    Explore,
    Logout,
    Print,
} from '@mui/icons-material';

import { useAuth } from '@src/providers/AuthProvider';
import { useCustomTheme } from '@src/providers/CustomThemeProvider';
import { NavigationRoute } from '@src/constants/enums';

export const UserMenu = () => {
    const { pathname } = useLocation();
    const { logout } = useAuth();
    const { mode, toggleTheme } = useCustomTheme();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        logout();
    };

    return (
        <>
            <IconButton size="small" onClick={handleMenuOpen} color="inherit">
                <AccountCircle />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                sx={{
                    '&& .Mui-selected': {
                        backgroundColor:
                            mode === 'light'
                                ? 'secondary.light'
                                : 'primary.light',
                    },
                }}
            >
                <MenuItem
                    onClick={() => navigate('campaign')}
                    selected={pathname === NavigationRoute.campaign}
                >
                    <ListItemIcon>
                        <Explore />
                    </ListItemIcon>
                    <ListItemText>Выбрать кампанию</ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={() => navigate('printer')}
                    selected={pathname === NavigationRoute.printer}
                >
                    <ListItemIcon>
                        <Print />
                    </ListItemIcon>
                    <ListItemText>Перейти к печати</ListItemText>
                </MenuItem>
                <MenuItem onClick={toggleTheme}>
                    <ListItemIcon>
                        {mode === 'light' ? <Brightness7 /> : <Brightness4 />}
                    </ListItemIcon>
                    <ListItemText>Сменить тему</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>
                    <ListItemText>Выйти</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
};
