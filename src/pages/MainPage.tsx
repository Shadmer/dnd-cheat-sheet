import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, Stack } from '@mui/material';
import { MainNavigation } from '@src/components/common/MainNavigation';
import { useDrawer } from '@src/providers/DrawerProvider';
import { useDialog } from '@src/providers/DialogProvider';

export const MainPage = () => {
    const { openDrawer } = useDrawer();
    const { openDialog } = useDialog();

    const dialogContent = (
        <div>
            <h2>Заголовок</h2>
            <p>Это контент диалога.</p>
        </div>
    );

    const drawerContent = (
        <div>
            <h2>Заголовок</h2>
            <p>Это выдвижной контент.</p>
            <button onClick={() => openDialog(dialogContent)}>
                Открыть диалог
            </button>
        </div>
    );

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
                {/* <button onClick={() => openDrawer(drawerContent)}>
                    drawerOpen
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
