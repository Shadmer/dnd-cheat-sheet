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
import { Logout, AccountCircle } from '@mui/icons-material';
import { useDialog } from '@src/providers/DialogProvider';
import { useAuth } from '@src/providers/AuthProvider';
import { MainNavigation } from '@src/components/common/MainNavigation';
import { PlotCard } from '@src/components/plot/PlotCard';

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
        <Stack p="80px 0">
            <Box
                component="header"
                sx={{
                    position: 'fixed',
                    top: 0,
                    width: '100%',
                    background: (theme) => theme.palette.background.paper,
                    boxShadow: 1,
                    zIndex: 1100,
                }}
            >
                <Container
                    maxWidth="xl"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: '55px',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" component="h1">
                            История Мистера Markdown
                        </Typography>
                    </Box>

                    <Box>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
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
                </Container>
            </Box>
            <Box component="main">
                <Container maxWidth="xl">
                    <Outlet />
                </Container>
            </Box>
            <Box
                component="footer"
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    width: '100%',
                    background: (theme) => theme.palette.background.paper,
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
                    <MainNavigation />
                </Container>
            </Box>
        </Stack>
    );
};
