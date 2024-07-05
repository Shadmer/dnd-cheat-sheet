import React from 'react';
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
    Logout,
    Print,
} from '@mui/icons-material';

import { useAuth } from '@src/providers/AuthProvider';
import { useCustomTheme } from '@src/providers/CustomThemeProvider';
import { useDialog } from '@src/providers/DialogProvider';

import { ImagePrinter } from '@src/components/other/ImagePrinter';

export const UserMenu = () => {
    const { logout } = useAuth();
    const { mode, toggleTheme } = useCustomTheme();
    const { openDialog } = useDialog();

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

    const handleOpenPrintModal = () => {
        openDialog('Печать изображений', <ImagePrinter />, true);
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
                <MenuItem onClick={handleOpenPrintModal}>
                    <ListItemIcon>
                        <Print />
                    </ListItemIcon>
                    <ListItemText>Перейти к печати</ListItemText>
                </MenuItem>
                <MenuItem onClick={toggleTheme}>
                    <ListItemIcon>
                        {mode === 'light' ? <Brightness7 /> : <Brightness4 />}
                    </ListItemIcon>
                    <ListItemText>
                        {mode === 'light' ? 'Светлая тема' : 'Тёмная тема'}
                    </ListItemText>
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
