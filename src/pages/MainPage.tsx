import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Button, Container, Dialog, Drawer, Stack } from '@mui/material';
import { MainNavigation } from '@src/components/MainNavigation';

export const MainPage = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    return (
        <Stack pt="20px" pb="80px">
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
                <Container
                    maxWidth="xl"
                    sx={{
                        height: '55px',
                    }}
                >
                    <MainNavigation />
                </Container>
            </Box>
            <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                Контент меню
                <Button onClick={() => setDialogOpen(true)}>Диалог</Button>
            </Drawer>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                Диалог контент
            </Dialog>
        </Stack>
    );
};
