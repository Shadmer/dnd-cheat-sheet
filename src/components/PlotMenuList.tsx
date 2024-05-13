import React from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Unstable_Grid2 as Grid, Typography } from '@mui/material';
import { StyledPaper } from '@src/components/StyledPaper';
import { PlotMenuItem } from '@src/components/PlotMenuItem';
import { useStores } from '@src/providers/rootStoreContext';
import { IPlotMenuItem } from '@src/interfaces';

export const PlotMenuList = observer(() => {
    const { scene } = useParams();

    const menuGridWidth = React.useMemo(
        () => (scene ? { xs: 12 } : { xs: 12, md: 6, lg: 4 }),
        [scene]
    );

    const getMarginBottom = (index: number, length: number) => {
        if (!scene) return 0;

        return index === length - 1 ? 0 : '1rem';
    };

    const {
        plot: { loadPlotMenuList, filteredPlotMenuList },
    } = useStores();

    React.useEffect(() => {
        loadPlotMenuList();
    }, [loadPlotMenuList]);

    return (
        <StyledPaper
            elevation={0}
            bgcolor="default"
            disableCustomScroll={!scene}
        >
            <Grid container spacing={scene ? 0 : 2}>
                {filteredPlotMenuList.length ? (
                    filteredPlotMenuList.map(
                        (scene: IPlotMenuItem, index: number) => (
                            <Grid
                                key={scene.sceneId}
                                {...menuGridWidth}
                                sx={{
                                    mb: getMarginBottom(
                                        index,
                                        filteredPlotMenuList.length
                                    ),
                                }}
                            >
                                <PlotMenuItem scene={scene} />
                            </Grid>
                        )
                    )
                ) : (
                    <Grid py={2}>
                        <Typography variant="body2" color="text.secondary">
                            Ничего не найдено
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </StyledPaper>
    );
});
