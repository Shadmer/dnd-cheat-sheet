import React from 'react';
import { useParams } from 'react-router-dom';

import { Unstable_Grid2 as Grid } from '@mui/material';

import { PlotMenuList } from '@src/components/PlotMenuList';

import { PlotCard } from '@src/components/PlotCard';

export const PlotPage = () => {
    const { scene } = useParams();

    const menuGridWidth = React.useMemo(
        () => (scene ? { sm: 12, md: 3 } : { sm: 12 }),
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
                <Grid sm={12} md={9}>
                    <PlotCard />
                </Grid>
            )}
        </Grid>
    );
};
