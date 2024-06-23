import React from 'react';
import { Outlet } from 'react-router-dom';
import {
    Box,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Logout, AccountCircle } from '@mui/icons-material';
import { useDialog } from '@src/providers/DialogProvider';
import { useAuth } from '@src/providers/AuthProvider';
import { MainNavigation } from '@src/components/common/MainNavigation';
import { PlotCard } from '@src/components/plot/PlotCard';

import bg from '@src/assets/img/bg.jpg';

export const MainPage = () => {
    const { logout } = useAuth();
    const { openDialog } = useDialog();

    const dialogContent = <PlotCard />;

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
        <Stack
            pt="30px"
            pb="80px"
            sx={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center bottom',
                backgroundColor: '#111111',
            }}
        >
            <Box component="main">
                <Container
                    maxWidth="xl"
                    sx={{
                        background: (theme) =>
                            alpha(theme.palette.background.default, 0.9),
                    }}
                >
                    <Outlet />
                </Container>
            </Box>
            <Box
                component="footer"
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    width: '100%',
                    background: (theme) =>
                        alpha(theme.palette.primary.main, 0.6),
                }}
            >
                {/* <button onClick={() => openDialog(dialogContent)}>
                    Открыть диалог
                </button> */}
                <Container
                    maxWidth="xl"
                    sx={{
                        height: '55px',
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Box flexGrow={1}>
                            <MainNavigation />
                        </Box>
                        <Box
                            sx={{
                                color: (theme) =>
                                    theme.palette.primary.contrastText,
                                paddingLeft: 1.5,
                                borderLeft: '1px solid',
                            }}
                        >
                            <IconButton
                                size="small"
                                onClick={handleMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
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
                                <MenuItem onClick={handleLogout}>
                                    <Logout sx={{ mr: 1 }} />
                                    Выйти
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Stack>
                </Container>
            </Box>
        </Stack>
    );
};
