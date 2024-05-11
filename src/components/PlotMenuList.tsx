import React from 'react';
import { useParams } from 'react-router-dom';

import { Unstable_Grid2 as Grid } from '@mui/material';
import { StyledPaper } from '@src/components/StyledPaper';
import { PlotMenuItem } from '@src/components/PlotMenuItem';

export const PlotMenuList = () => {
    const { scene } = useParams();

    const menuGridWidth = React.useMemo(
        () => (scene ? { xs: 12 } : { xs: 12, md: 6, lg: 4 }),
        [scene]
    );

    return (
        <StyledPaper
            elevation={0}
            bgcolor="default"
            disableCustomScroll={!scene}
        >
            <Grid container spacing={scene ? 0 : 2}>
                {['1', '2', '3', '4', '5', '6'].map((item, index, array) => (
                    <Grid
                        key={item}
                        {...menuGridWidth}
                        sx={{ mb: index === array.length - 1 ? 0 : '2rem' }}
                    >
                        <PlotMenuItem item={item} />
                    </Grid>
                ))}
            </Grid>
        </StyledPaper>
    );
};
