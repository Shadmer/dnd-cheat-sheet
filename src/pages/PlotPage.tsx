import React from 'react';
import { useParams } from 'react-router-dom';

import { Unstable_Grid2 as Grid } from '@mui/material';

import { PlotMenuList } from '@src/components/modules/plot/PlotMenuList';
import { PlotCard } from '@src/components/modules/plot/PlotCard';

export const PlotPage = () => {
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
                <PlotMenuList />
            </Grid>
            {scene && (
                <Grid xs={12} md={9}>
                    <PlotCard />
                </Grid>
            )}
        </Grid>
    );
};
