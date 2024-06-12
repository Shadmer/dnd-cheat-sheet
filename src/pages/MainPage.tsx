import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, Stack } from '@mui/material';
import { MainNavigation } from '@src/components/common/MainNavigation';
import { useDialog } from '@src/providers/DialogProvider';
import { PlotCard } from '@src/components/plot/PlotCard';

export const MainPage = () => {
    const { openDialog } = useDialog();
    const dialogContent = <PlotCard />;

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
