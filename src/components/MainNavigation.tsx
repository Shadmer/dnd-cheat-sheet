import React, { ReactElement } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import {
    AutoStories,
    Extension,
    HelpCenter,
    Route,
    SportsKabaddi,
} from '@mui/icons-material';

interface INavigationAction {
    value: string;
    label: string;
    icon: ReactElement;
}

const navigationActionList: INavigationAction[] = [
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

export const MainNavigation = () => {
    const { pathname } = useLocation();
    const activeTab = React.useMemo(() => {
        return navigationActionList.find((action) =>
            pathname.startsWith(action.value)
        );
    }, [pathname]);

    return (
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
    );
};