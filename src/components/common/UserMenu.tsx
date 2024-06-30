import React from 'react';
import {
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Switch,
} from '@mui/material';
import {
    AccountCircle,
    Brightness7,
    Brightness4,
    Logout,
} from '@mui/icons-material';

import { useAuth } from '@src/providers/AuthProvider';
import { useCustomTheme } from '@src/providers/CustomThemeProvider';

export const UserMenu = () => {
    const { logout } = useAuth();
    const { mode, toggleTheme } = useCustomTheme();

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
            >
                <MenuItem onClick={toggleTheme}>
                    <ListItemIcon>
                        {mode === 'light' ? <Brightness7 /> : <Brightness4 />}
                    </ListItemIcon>
                    <ListItemText>
                        {mode === 'light' ? 'Светлая тема' : 'Тёмная тема'}
                    </ListItemText>
                    <Switch
                        checked={mode === 'light'}
                        onChange={toggleTheme}
                        color="default"
                    />
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <Logout sx={{ mr: 1 }} />
                    Выйти
                </MenuItem>
            </Menu>
        </>
    );
};
