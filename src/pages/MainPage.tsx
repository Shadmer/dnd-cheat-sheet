import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, Stack, useMediaQuery } from '@mui/material';
import { Theme, alpha } from '@mui/material/styles';

import { useDialog } from '@src/providers/DialogProvider';

import { MainNavigation } from '@src/components/other/MainNavigation';
import { PlotCard } from '@src/components/plot/PlotCard';
import { UserMenu } from '@src/components/other/UserMenu';

import bg from '@src/assets/img/bg.jpg';

export const MainPage = () => {
    const isMdScreen = useMediaQuery((theme: Theme) =>
        theme.breakpoints.up('md')
    );
    const { openDialog } = useDialog();

    const dialogContent = <PlotCard />;

    return (
        <Stack
            pt={isMdScreen ? '30px' : '10px'}
            pb={isMdScreen ? '80px' : '60px'}
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
                    zIndex: 1,
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
