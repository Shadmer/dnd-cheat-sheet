import React, { ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { AutoStories, Extension, ImportContacts } from '@mui/icons-material';
import { useNavigateWithSave } from '@src/providers/NavigateWithSaveProvider';
import { NavigationRoute } from '@src/constants/enums';

interface INavigationAction {
    value: string;
    label: string;
    icon: ReactElement;
}

const navigationActionList: INavigationAction[] = [
    {
        value: NavigationRoute.plot,
        label: 'Сюжет',
        icon: <AutoStories />,
    },
    {
        value: NavigationRoute.codex,
        label: 'Кодекс',
        icon: <ImportContacts />,
    },
    {
        value: NavigationRoute.workshop,
        label: 'Мастерская',
        icon: <Extension />,
    },
];

export const MainNavigation = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { getLastPlotPage, getLastCodexPage, getLastWorkshopPage } =
        useNavigateWithSave();

    const activeTab = React.useMemo(() => {
        return navigationActionList.find((action) =>
            pathname.startsWith(action.value)
        );
    }, [pathname]);

    const handleNavigation = (value: string) => {
        const lastPages = [
            {
                route: NavigationRoute.plot,
                getLastPage: getLastPlotPage,
            },
            {
                route: NavigationRoute.codex,
                getLastPage: getLastCodexPage,
            },
            {
                route: NavigationRoute.workshop,
                getLastPage: getLastWorkshopPage,
            },
        ];

        const lastPageEntry = lastPages.find((entry) => entry.route === value);
        const navigateTo = lastPageEntry
            ? lastPageEntry.getLastPage() ?? value
            : value;
        navigate(navigateTo);
    };

    return (
        <BottomNavigation
            value={activeTab?.value ?? ''}
            onChange={(_, newValue: string) => handleNavigation(newValue)}
            sx={{
                background: 'none',
                '& .MuiBottomNavigationAction-root': {
                    color: (theme) => theme.palette.common.white,
                    '&.Mui-selected': {
                        color: (theme) => theme.palette.secondary.light,
                    },
                },
                '& .MuiBottomNavigationAction-label': {
                    '&.Mui-selected': {
                        fontWeight: 'bold',
                    },
                },
            }}
        >
            {navigationActionList.map((action) => (
                <BottomNavigationAction
                    title={action.label}
                    key={action.value}
                    value={action.value}
                    label={action.label}
                    icon={action.icon}
                    sx={{ minWidth: '20px' }}
                />
            ))}
        </BottomNavigation>
    );
};
