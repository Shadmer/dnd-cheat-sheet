import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Unstable_Grid2 as Grid } from '@mui/material';

import { CodexMenuList } from '@src/components/codex/CodexMenuList';
import { CodexCard } from '@src/components/codex/CodexCard';

export const CodexPage = () => {
    const { section, id } = useParams();
    const navigate = useNavigate();

    const menuGridWidth = React.useMemo(
        () => (section ? { xs: 12, md: 3 } : { xs: 12 }),
        [section]
    );

    React.useEffect(() => {
        if (section && !id) {
            navigate('/game/codex');
        }
    }, [id, navigate, section]);

    return (
        <Grid container spacing={2}>
            <Grid
                xs={12}
                md={4}
                lg={3}
                sx={{ display: { xs: 'none', md: 'block' } }}
            >
                <CodexMenuList />
            </Grid>
            <Grid xs={12} md={8} lg={9}>
                <CodexCard />
            </Grid>
        </Grid>
    );
};
