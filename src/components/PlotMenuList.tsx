import React from 'react';
import { useParams } from 'react-router-dom';

import { Unstable_Grid2 as Grid } from '@mui/material';
import { StyledPaper } from '@src/components/StyledPaper';
import { PlotMenuItem } from '@src/components/PlotMenuItem';

export const PlotMenuList = ({ plots }: any) => {
    const { scene } = useParams();

    const menuGridWidth = React.useMemo(
        () => (scene ? { xs: 12 } : { xs: 12, md: 6, lg: 4 }),
        [scene]
    );

    const getMarginBottom = (index: number, length: number) => {
        if (!scene) return 0;

        return index === length - 1 ? 0 : '1rem';
    };

    return (
        <StyledPaper
            elevation={0}
            bgcolor="default"
            disableCustomScroll={!scene}
        >
            <Grid container spacing={scene ? 0 : 2}>
                {plots.map((item: any, index: number, array: any) => (
                    <Grid
                        key={item.sceneId}
                        {...menuGridWidth}
                        sx={{
                            mb: getMarginBottom(index, array.length),
                        }}
                    >
                        <PlotMenuItem
                            sceneId={item.sceneId}
                            title={item.title}
                            info={item.info}
                        />
                    </Grid>
                ))}
            </Grid>
        </StyledPaper>
    );
};
