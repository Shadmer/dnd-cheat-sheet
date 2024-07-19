import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Box, IconButton, Paper, Stack, Typography } from '@mui/material';
import { ArrowBack, ArrowForward, Clear } from '@mui/icons-material';

import { useCampaign } from '@src/providers/CampaignProvider';
import { useStores } from '@src/providers/RootStoreContext';
import { useNavigateWithSave } from '@src/providers/NavigateWithSaveProvider';
import { LastPageType, NavigationRoute } from '@src/constants/enums';

import { ScrollableBox } from '@src/components/common/ScrollableBox';
import { MarkdownRenderer } from '@src/components/common/MarkdownRenderer';
import { FlexHeightContainer } from '@src/components/common/FlexHeightContainer';
import { SkeletonLoading } from '@src/components/common/SkeletonLoading';

export const PlotCard = observer(() => {
    const { scene } = useParams();
    const navigate = useNavigate();
    const { navigateWithSave } = useNavigateWithSave();
    const { currentCampaign } = useCampaign();
    const {
        plot: {
            loadScene,
            clearScene,
            setNavigate,
            currentScene,
            currentSceneLoading,
            plotMenuList,
        },
    } = useStores();

    const plotMenuTitle =
        plotMenuList.find((item) => item.sceneId === scene)?.title ?? '';

    const plotMenuSubTitle =
        plotMenuList.find((item) => item.sceneId === scene)?.part ?? '';

    const currentIndex = plotMenuList.findIndex(
        (item) => item.sceneId === scene
    );

    const prevScene =
        currentIndex > 0
            ? `${NavigationRoute.plot}/${
                  plotMenuList[currentIndex - 1].sceneId
              }`
            : '';

    const nextScene =
        currentIndex < plotMenuList.length - 1
            ? `${NavigationRoute.plot}/${
                  plotMenuList[currentIndex + 1].sceneId
              }`
            : '';

    React.useEffect(() => {
        if (scene) loadScene(currentCampaign, scene);

        return () => {
            clearScene();
        };
    }, [currentCampaign, clearScene, loadScene, scene]);

    React.useEffect(() => {
        setNavigate(navigate);
    }, [navigate, setNavigate]);

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
                <Typography variant="body2" component="p" fontFamily="ofont">
                    {plotMenuSubTitle}
                </Typography>
                <Typography
                    fontWeight="500"
                    variant="h2"
                    component="h1"
                    fontFamily="ofont"
                >
                    {plotMenuTitle}
                </Typography>
            </Box>

            <IconButton
                onClick={() =>
                    navigateWithSave(NavigationRoute.plot, LastPageType.scene)
                }
            >
                <Clear />
            </IconButton>
        </Stack>
    );

    const content = (
        <ScrollableBox bgcolor="paper">
            <Box p="1rem">
                {currentSceneLoading ? (
                    <SkeletonLoading />
                ) : (
                    <MarkdownRenderer markdown={currentScene} />
                )}
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
                disabled={currentIndex === 0}
                onClick={() => navigateWithSave(prevScene, LastPageType.scene)}
            >
                <ArrowBack />
            </IconButton>
            <IconButton
                disabled={currentIndex === plotMenuList.length - 1}
                onClick={() => navigateWithSave(nextScene, LastPageType.scene)}
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
