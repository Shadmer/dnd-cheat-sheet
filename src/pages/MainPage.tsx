import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, Stack, useMediaQuery } from '@mui/material';
import { Theme, alpha } from '@mui/material/styles';

import { useCampaign } from '@src/providers/CampaignProvider';
import { useStores } from '@src/providers/RootStoreContext';

import { MainNavigation } from '@src/components/shared/MainNavigation';
import { UserMenu } from '@src/components/shared/UserMenu';

import bg from '@src/assets/img/bg.jpg';

export const MainPage = () => {
    const isMdScreen = useMediaQuery((theme: Theme) =>
        theme.breakpoints.up('md')
    );
    const { currentCampaign } = useCampaign();
    const {
        codex: { loadMenuList },
    } = useStores();

    React.useEffect(() => {
        loadMenuList(currentCampaign);
    }, [currentCampaign, loadMenuList]);

    return (
        <Stack
            pt={isMdScreen ? '30px' : '10px'}
            pb={isMdScreen ? '80px' : '60px'}
            sx={{
                minHeight: '100dvh',
                backgroundImage: `url(${bg})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center bottom',
                backgroundColor: '#111111',
            }}
            overflow="hidden"
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
                    paddingBottom: '5px',
                    background: (theme) =>
                        alpha(theme.palette.primary.main, 0.6),
                    zIndex: 1,
                }}
            >
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
