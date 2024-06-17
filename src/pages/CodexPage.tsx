import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Unstable_Grid2 as Grid, Theme, useMediaQuery } from '@mui/material';

import { CodexMenuList } from '@src/components/codex/CodexMenuList';
import { CodexCard } from '@src/components/codex/CodexCard';
import { NavigationRoute } from '@src/enums';

export const CodexPage = () => {
    const { section, id } = useParams();
    const navigate = useNavigate();

    const isMdScreen = useMediaQuery((theme: Theme) =>
        theme.breakpoints.up('md')
    );

    React.useEffect(() => {
        if (section && !id) {
            navigate(NavigationRoute.codex);
        }
    }, [id, navigate, section]);

    return (
        <Grid container spacing={2}>
            {isMdScreen && (
                <Grid xs={12} md={4} lg={3}>
                    <CodexMenuList params={{ section, id }} />
                </Grid>
            )}
            <Grid xs={12} md={8} lg={9}>
                <CodexCard />
            </Grid>
        </Grid>
    );
};
