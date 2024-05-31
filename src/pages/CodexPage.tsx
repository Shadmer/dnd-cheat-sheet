import React from 'react';
import { useParams } from 'react-router-dom';

import { Unstable_Grid2 as Grid } from '@mui/material';

import { CodexMenuList } from '@src/components/codex/CodexMenuList';
// import { CodexCard } from '@src/components/codex/CodexCard';

export const CodexPage = () => {
    const { scene } = useParams();

    const menuGridWidth = React.useMemo(
        () => (scene ? { xs: 12, md: 3 } : { xs: 12 }),
        [scene]
    );

    return (
        <Grid container spacing={2}>
            <Grid
                {...menuGridWidth}
                sx={{
                    display: {
                        xs: scene ? 'none' : 'block',
                        md: 'block',
                    },
                }}
            >
                <CodexMenuList />
            </Grid>
            {scene && (
                <Grid xs={12} md={9}>
                    {/* <CodexCard /> */}
                </Grid>
            )}
        </Grid>
    );
};
