import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Box, IconButton, Paper, Stack, Typography } from '@mui/material';
import { Clear, Close } from '@mui/icons-material';
import { useStores } from '@src/providers/rootStoreContext';
import { ScrollableBox } from '@src/components/ScrollableBox';
import { MarkdownRenderer } from '@src/components/MarkdownRenderer';
import { FlexHeightContainer } from '@src/components/FlexHeightContainer';

export const PlotCard = observer(() => {
    const { scene } = useParams();
    const {
        plot: { loadScene, currentScene, plotMenuList },
    } = useStores();

    const plotMenuTitle =
        plotMenuList.find((item) => item.sceneId === scene)?.title ?? '';

    React.useEffect(() => {
        if (scene) loadScene(scene);
    }, [loadScene, scene]);

    const header = (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            p={2}
            borderBottom={1}
            bgcolor="background.paper"
            boxShadow={1}
        >
            <Typography fontWeight="500" variant="h4" component="h1">
                {plotMenuTitle}
            </Typography>
            <IconButton component={Link} to="../plot" color="primary">
                <Clear />
            </IconButton>
        </Stack>
    );

    const content = (
        <ScrollableBox>
            <Box p="2rem">
                <MarkdownRenderer markdown={currentScene} />
            </Box>
        </ScrollableBox>
    );

    return (
        <Paper>
            <FlexHeightContainer header={header} content={content} />
        </Paper>
    );
});
