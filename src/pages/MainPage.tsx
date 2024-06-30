import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, Stack } from '@mui/material';
import { alpha } from '@mui/material/styles';

import { useDialog } from '@src/providers/DialogProvider';

import { MainNavigation } from '@src/components/common/MainNavigation';
import { PlotCard } from '@src/components/plot/PlotCard';
import { UserMenu } from '@src/components/common/UserMenu';

import bg from '@src/assets/img/bg.jpg';

export const MainPage = () => {
    const { openDialog } = useDialog();

    const dialogContent = <PlotCard />;

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
                            <UserMenu />
                        </Box>
                    </Stack>
                </Container>
            </Box>
        </Stack>
    );
};
