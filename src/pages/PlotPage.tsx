import React from 'react';
import { Outlet, useParams } from 'react-router-dom';

import { Unstable_Grid2 as Grid } from '@mui/material';
import { PlotMenuList } from '@src/components/PlotMenuList';

export const PlotPage = () => {
    const { scene } = useParams();

    const menuGridWidth = React.useMemo(
        () => (scene ? { xs: 12, sm: 4, md: 3 } : { xs: 12 }),
        [scene]
    );

    return (
        <Grid container spacing={2}>
            <Grid
                {...menuGridWidth}
                sx={{
                    display: {
                        xs: scene ? 'none' : 'block',
                        sm: 'block',
                    },
                }}
            >
                <PlotMenuList />
            </Grid>
            {scene && (
                <Grid xs={12} sm={8} md={9}>
                    <Outlet />
                </Grid>
            )}
        </Grid>
    );
};
