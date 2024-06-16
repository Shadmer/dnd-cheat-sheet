import React, { ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { AutoStories, Extension, HelpCenter, Route } from '@mui/icons-material';
import { useNavigateWithSave } from '@src/providers/NavigateWithSaveProvider';
import { NavigationRoute } from '@src/enums';

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
        value: NavigationRoute.journey,
        label: 'Путешествие',
        icon: <Route />,
    },
    {
        value: NavigationRoute.battle,
        label: 'Сражение',
        icon: <Extension />,
    },
    {
        value: NavigationRoute.codex,
        label: 'Кодекс',
        icon: <HelpCenter />,
    },
];

export const MainNavigation = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { getLastPlotPage, getLastCodexPage } = useNavigateWithSave();

    const activeTab = React.useMemo(() => {
        return navigationActionList.find((action) =>
            pathname.startsWith(action.value)
        );
    }, [pathname]);

    const handleNavigation = (value: string) => {
        const lastPages = [
            { route: NavigationRoute.plot, getLastPage: getLastPlotPage },
            { route: NavigationRoute.codex, getLastPage: getLastCodexPage },
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
