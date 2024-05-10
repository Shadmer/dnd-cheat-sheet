import React, { ReactElement } from 'react';
import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Button,
    Container,
    Dialog,
    Drawer,
    Stack,
} from '@mui/material';
import {
    AutoStories,
    Extension,
    HelpCenter,
    Route,
    SportsKabaddi,
} from '@mui/icons-material';

interface InavigationAction {
    value: string;
    label: string;
    icon: ReactElement;
}

const navigationActionList: InavigationAction[] = [
    {
        value: '/game/plot',
        label: 'Сюжет',
        icon: <AutoStories />,
    },
    {
        value: '/game/journey',
        label: 'Путешествие',
        icon: <Route />,
    },
    {
        value: '/game/battle',
        label: 'Битва',
        icon: <SportsKabaddi />,
    },
    {
        value: '/game/codex',
        label: 'Кодекс',
        icon: <HelpCenter />,
    },
    {
        value: '/game/interactive',
        label: 'Интерактив',
        icon: <Extension />,
    },
];

export const MainPage = () => {
    const { pathname } = useLocation();
    const activeTab = React.useMemo(() => {
        return navigationActionList.find((action) =>
            pathname.startsWith(action.value)
        );
    }, [pathname]);
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
                    <BottomNavigation value={activeTab?.value ?? ''}>
                        {navigationActionList.map((action) => (
                            <BottomNavigationAction
                                key={action.value}
                                component={RouterLink}
                                to={action.value}
                                value={action.value}
                                label={action.label}
                                icon={action.icon}
                                sx={{ minWidth: '20px' }}
                            />
                        ))}
                    </BottomNavigation>
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
