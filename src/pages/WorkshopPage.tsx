import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Unstable_Grid2 as Grid, Theme, useMediaQuery } from '@mui/material';
import { useStores } from '@src/providers/RootStoreContext';
import { Module, NavigationRoute } from '@src/constants/enums';
import { MainMenuList } from '@src/components/shared/MainMenuList';
import { MainCard } from '@src/components/shared/MainCard';

export const WorkshopPage = observer(() => {
    const { section, id } = useParams();
    const navigate = useNavigate();
    const {
        workshop: {
            isLoading,
            defaultCardText,
            menuList,
            filteredMenuList,
            currentPage,
            filterMenuList,
            loadDefaultCardText,
            loadPage,
            setNavigate,
            clearPage,
        },
    } = useStores();

    const isMdScreen = useMediaQuery((theme: Theme) =>
        theme.breakpoints.up('md')
    );

    const createMainMenuList = (onItemSelect?: () => void) => (
        <MainMenuList
            module={Module.workshop}
            params={{ section, id }}
            filteredMenuList={filteredMenuList}
            filterMenuList={filterMenuList}
            onItemSelect={onItemSelect}
        />
    );

    const mainMenuList = createMainMenuList();

    React.useEffect(() => {
        if (section && !id) {
            navigate(NavigationRoute.workshop);
        }
    }, [id, navigate, section]);

    React.useEffect(() => {
        loadDefaultCardText();
    }, [loadDefaultCardText]);

    React.useEffect(() => {
        if (id) {
            loadPage(id);

            return () => {
                clearPage();
            };
        }
    }, [clearPage, id, loadPage, section]);

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
                    module={Module.workshop}
                    params={{ section, id }}
                    isLoading={isLoading}
                    currentPage={currentPage}
                    menuList={menuList}
                    defaultCardText={defaultCardText}
                    setNavigate={setNavigate}
                    createMainMenuList={createMainMenuList}
                />
            </Grid>
        </Grid>
    );
});
