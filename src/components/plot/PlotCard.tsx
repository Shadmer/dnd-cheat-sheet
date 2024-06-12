import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Box, IconButton, Paper, Stack, Typography } from '@mui/material';
import { ArrowBack, ArrowForward, Clear } from '@mui/icons-material';
import { useStores } from '@src/providers/RootStoreContext';
import { ScrollableBox } from '@src/components/common/ScrollableBox';
import { MarkdownRenderer } from '@src/components/common/MarkdownRenderer';
import { FlexHeightContainer } from '@src/components/common/FlexHeightContainer';

export const PlotCard = observer(() => {
    const { scene } = useParams();
    const {
        plot: { loadScene, clearScene, currentScene, plotMenuList },
    } = useStores();

    const plotMenuTitle =
        plotMenuList.find((item) => item.sceneId === scene)?.title ?? '';

    const plotMenuSubTitle =
        plotMenuList.find((item) => item.sceneId === scene)?.subTitle ?? '';

    const currentIndex = plotMenuList.findIndex(
        (item) => item.sceneId === scene
    );

    const prevScene =
        currentIndex > 0
            ? `../plot/${plotMenuList[currentIndex - 1].sceneId}`
            : '';

    const nextScene =
        currentIndex < plotMenuList.length - 1
            ? `../plot/${plotMenuList[currentIndex + 1].sceneId}`
            : '';

    React.useEffect(() => {
        if (scene) loadScene(scene);

        return () => {
            clearScene();
        };
    }, [clearScene, loadScene, scene]);

    const header = (
        <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
            p="1rem"
            bgcolor="background.paper"
            boxShadow={1}
        >
            <Box>
                <Typography variant="body2" component="p">
                    {plotMenuSubTitle}
                </Typography>
                <Typography fontWeight="500" variant="h2" component="h1">
                    {plotMenuTitle}
                </Typography>
            </Box>

            <IconButton component={Link} to="../plot" color="primary">
                <Clear />
            </IconButton>
        </Stack>
    );

    const content = (
        <ScrollableBox>
            <Box p="1rem">
                <MarkdownRenderer markdown={currentScene} />
            </Box>
        </ScrollableBox>
    );

    const footer = (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            p="1rem"
            bgcolor="background.paper"
        >
            <IconButton
                component={Link}
                disabled={currentIndex === 0}
                to={prevScene}
                color="primary"
            >
                <ArrowBack />
            </IconButton>
            <IconButton
                component={Link}
                disabled={currentIndex === plotMenuList.length - 1}
                to={nextScene}
                color="primary"
            >
                <ArrowForward />
            </IconButton>
        </Stack>
    );

    return (
        <Paper>
            <FlexHeightContainer
                header={header}
                content={content}
                footer={footer}
            />
        </Paper>
    );
});
