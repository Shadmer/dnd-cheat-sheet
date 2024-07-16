import React, { ReactElement } from 'react';
import { NavigateFunction, Params, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import {
    Box,
    IconButton,
    Paper,
    Stack,
    Tab,
    Theme,
    Tooltip,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { Clear, MenuOpen } from '@mui/icons-material';

import { ICard, IMenuList } from '@src/interfaces/common';
import { Module } from '@src/constants/enums';

import { useDrawer } from '@src/providers/DrawerProvider';
import { useNavigateWithSave } from '@src/providers/NavigateWithSaveProvider';

import { ScrollableBox } from '@src/components/common/ScrollableBox';
import { MarkdownRenderer } from '@src/components/common/MarkdownRenderer';
import { FlexHeightContainer } from '@src/components/common/FlexHeightContainer';
import { FullWidthTabs } from '@src/components/common/FullWidthTabs';
import { ImageGallery } from '@src/components/common/ImageGallery';
import { SkeletonLoading } from '@src/components/common/SkeletonLoading';

import { CreatureCard } from '@src/components/modules/codex/CreatureContent';
import { ArtifactContent } from '@src/components/modules/codex/ArtifactContent';
import { CharacterContent } from '@src/components/modules/codex/CharacterContent';
import { PlaceContent } from '@src/components/modules/codex/PlaceContent';
import { ShopContent } from '@src/components/modules/codex/ShopContent';

import { BattlefieldContent } from '@src/components/modules/workshop/BattlefieldContent';
import { moduleMap } from '@src/constants/constants';

interface ITabData {
    id: string;
    label: string;
    content: ReactElement;
}

interface MainCardProps {
    module: Module;
    params: Params<string>;
    isLoading: boolean;
    defaultCardText: string;
    currentPage: ICard | null;
    menuList: IMenuList[];
    createMainMenuList: (onItemSelect?: () => void) => JSX.Element;
    setNavigate: (navigate: NavigateFunction) => void;
}

export const MainCard = observer<MainCardProps>(
    ({
        module,
        params,
        isLoading,
        defaultCardText,
        currentPage,
        menuList,
        createMainMenuList,
        setNavigate,
    }) => {
        const navigate = useNavigate();
        const isMdScreen = useMediaQuery((theme: Theme) =>
            theme.breakpoints.up('md')
        );
        const { navigateWithSave } = useNavigateWithSave();

        const { openDrawer, closeDrawer } = useDrawer();

        const [tabData, setTabData] = React.useState<ITabData[]>([]);

        const [tabValue, setTabValue] = React.useState('');

        const [currentSection, setCurrentSection] =
            React.useState<IMenuList | null>(null);

        const [sectionTitle, setSectionTitle] = React.useState('');

        const [itemTitle, setItemTitle] = React.useState('');

        const getTabData = React.useCallback(() => {
            if (!currentPage) return;

            const newTabData: ITabData[] = [];

            if (currentPage.creature) {
                newTabData.push({
                    id: 'creature',
                    label: 'Характеристики',
                    content: <CreatureCard creature={currentPage.creature} />,
                });
            }

            if (currentPage.artifact) {
                newTabData.push({
                    id: 'artifact',
                    label: 'Свойства',
                    content: (
                        <ArtifactContent artifact={currentPage.artifact} />
                    ),
                });
            }

            if (currentPage.place) {
                newTabData.push({
                    id: 'place',
                    label: 'Особенности',
                    content: <PlaceContent place={currentPage.place} />,
                });
            }

            if (currentPage.character) {
                newTabData.push({
                    id: 'character',
                    label: 'Личность',
                    content: (
                        <CharacterContent character={currentPage.character} />
                    ),
                });
            }

            if (currentPage.shop) {
                newTabData.push({
                    id: 'shop',
                    label: 'Товары',
                    content: <ShopContent shop={currentPage.shop} />,
                });
            }

            if (currentPage.description) {
                newTabData.push({
                    id: 'description',
                    label: 'Описание',
                    content: (
                        <MarkdownRenderer markdown={currentPage.description} />
                    ),
                });
            }

            if (currentPage.images && currentPage.images.length) {
                const imagesName = params.id ?? 'codexImage';
                newTabData.push({
                    id: 'images',
                    label: 'Изображения',
                    content: (
                        <ImageGallery
                            images={currentPage.images}
                            alt={imagesName}
                        />
                    ),
                });
            }

            if (currentPage.maps && currentPage.maps.length) {
                const mapName = params.id ?? 'codexMap';
                newTabData.push({
                    id: 'maps',
                    label: 'Карты',
                    content: (
                        <ImageGallery images={currentPage.maps} alt={mapName} />
                    ),
                });
            }

            if (currentPage.battlefield) {
                newTabData.push({
                    id: 'battlefield',
                    label: 'Поле битвы',
                    content: <BattlefieldContent />,
                });
            }

            setTabData(newTabData);
            setTabValue(newTabData[0]?.id ?? '');
        }, [currentPage, params]);

        const getCurrentData = React.useCallback(() => {
            const newCurrentSection =
                menuList.find((item) => item.section === params.section) ??
                null;
            const newSectionTitle = currentSection?.title ?? '';
            const newItemTitle =
                currentSection?.content.find((item) => item.id === params.id)
                    ?.name ?? '';

            setCurrentSection(newCurrentSection);
            setSectionTitle(newSectionTitle);
            setItemTitle(newItemTitle);
        }, [menuList, currentSection, params]);

        const mainMenuList = createMainMenuList(closeDrawer);

        const header = (
            <Stack
                p="1rem 0"
                bgcolor="background.paper"
                boxShadow={1}
                spacing={2}
            >
                <Stack
                    direction="row"
                    alignItems="flex-start"
                    justifyContent="space-between"
                    p="0 1rem"
                >
                    <Box>
                        <Typography variant="body2">{sectionTitle}</Typography>
                        <Typography
                            fontWeight="500"
                            variant="h2"
                            component="h1"
                        >
                            {itemTitle}
                        </Typography>
                    </Box>
                    <Stack direction="row" alignItems="center">
                        <Tooltip title="Открыть меню">
                            <IconButton
                                sx={{
                                    display: {
                                        xs: 'flex',
                                        md: 'none',
                                    },
                                }}
                                onClick={() => openDrawer(mainMenuList)}
                            >
                                <MenuOpen />
                            </IconButton>
                        </Tooltip>
                        {currentSection && (
                            <IconButton
                                onClick={() =>
                                    navigateWithSave(
                                        moduleMap[module].navigationPrefix,
                                        moduleMap[module].lastPage
                                    )
                                }
                                sx={{ ml: 'auto' }}
                            >
                                <Clear />
                            </IconButton>
                        )}
                    </Stack>
                </Stack>
                {currentSection && tabData.length > 1 && (
                    <FullWidthTabs
                        value={tabValue}
                        onChange={(_, newValue) => setTabValue(newValue)}
                        variant="scrollable"
                        scrollButtons="auto"
                        allowScrollButtonsMobile
                    >
                        {tabData.map((tab) => (
                            <Tab
                                key={tab.id}
                                label={tab.label}
                                value={tab.id}
                            />
                        ))}
                    </FullWidthTabs>
                )}
            </Stack>
        );

        const content = (
            <ScrollableBox bgcolor="paper">
                <Box p="1rem" sx={{ height: '100%' }}>
                    {isLoading ? (
                        <SkeletonLoading />
                    ) : (
                        <>
                            {currentSection ? (
                                <Box sx={{ height: '100%' }}>
                                    {tabData.map((tab) => (
                                        <Box
                                            key={tab.id}
                                            hidden={tabValue !== tab.id}
                                            sx={{ height: '100%' }}
                                        >
                                            {tab.content}
                                        </Box>
                                    ))}
                                </Box>
                            ) : (
                                <MarkdownRenderer markdown={defaultCardText} />
                            )}
                        </>
                    )}
                </Box>
            </ScrollableBox>
        );

        React.useEffect(() => {
            getCurrentData();
        }, [getCurrentData]);

        React.useEffect(() => {
            getTabData();
        }, [getTabData]);

        React.useEffect(() => {
            if (isMdScreen) closeDrawer();
        }, [closeDrawer, isMdScreen]);

        React.useEffect(() => {
            setNavigate(navigate);
        }, [navigate, setNavigate]);

        return (
            <Paper>
                <FlexHeightContainer header={header} content={content} />
            </Paper>
        );
    }
);
