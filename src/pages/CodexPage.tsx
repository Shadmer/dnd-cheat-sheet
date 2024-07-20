import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import { Unstable_Grid2 as Grid, Theme, useMediaQuery } from '@mui/material';
import { Module, NavigationRoute } from '@src/constants/enums';
import { useCampaign } from '@src/providers/CampaignProvider';
import { useStores } from '@src/providers/RootStoreContext';
import { MainMenuList } from '@src/components/shared/MainMenuList';
import { MainCard } from '@src/components/shared/MainCard';
import codexImg from '@src/assets/img/codex.jpg';

export const CodexPage = observer(() => {
    const { section, id } = useParams();
    const navigate = useNavigate();
    const isMdScreen = useMediaQuery((theme: Theme) =>
        theme.breakpoints.up('md')
    );

    const { currentCampaign } = useCampaign();
    const {
        codex: {
            isLoading,
            menuList,
            filteredMenuList,
            currentPage,
            filterMenuList,
            loadPage,
            clearPage,
            setNavigate,
        },
    } = useStores();

    const createMainMenuList = (onItemSelect?: () => void) => (
        <MainMenuList
            module={Module.codex}
            params={{ section, id }}
            filteredMenuList={filteredMenuList}
            filterMenuList={filterMenuList}
            onItemSelect={onItemSelect}
        />
    );

    const mainMenuList = createMainMenuList();

    React.useEffect(() => {
        if (section && id) {
            loadPage(currentCampaign, section, id);

            return () => {
                clearPage();
            };
        }
    }, [currentCampaign, clearPage, id, loadPage, section]);

    React.useEffect(() => {
        if (section && !id) {
            navigate(NavigationRoute.codex);
        }
    }, [id, navigate, section]);

    return (
        <Grid container spacing={2}>
            <Grid
                xs={12}
                md={4}
                lg={3}
                sx={{
                    display: isMdScreen ? 'block' : 'none',
                }}
            >
                {mainMenuList}
            </Grid>

            <Grid xs={12} md={8} lg={9}>
                <MainCard
                    defaultTitle="Перелестните страницу"
                    module={Module.codex}
                    params={{ section, id }}
                    isLoading={isLoading}
                    currentPage={currentPage}
                    menuList={menuList}
                    defaultCardImg={codexImg}
                    setNavigate={setNavigate}
                    createMainMenuList={createMainMenuList}
                />
            </Grid>
        </Grid>
    );
});
