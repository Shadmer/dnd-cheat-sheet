import React, { ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { useStores } from '@src/providers/RootStoreContext';
import { useDrawer } from '@src/providers/DrawerProvider';
import { useNavigateWithSave } from '@src/providers/NavigateWithSaveProvider';
import { LastPageType, NavigationRoute } from '@src/enums';
import { ScrollableBox } from '@src/components/common/ScrollableBox';
import { MarkdownRenderer } from '@src/components/common/MarkdownRenderer';
import { FlexHeightContainer } from '@src/components/common/FlexHeightContainer';
import { FullWidthTabs } from '@src/components/common/FullWidthTabs';
import { ImageGallery } from '@src/components/common/ImageGallery';
import { CodexMenuList } from '@src/components/codex/CodexMenuList';
import { CreatureCard } from '@src/components/codex/CreatureContent';
import { ICodexMenuList } from '@src/interfaces';

interface ITabData {
    id: string;
    label: string;
    content: ReactElement;
}

const defaultContentText = (
    <Stack spacing={2} textAlign="justify">
        <Box>
            <Typography variant="h3" gutterBottom>
                Игроки
            </Typography>
            <Typography variant="body1" gutterBottom>
                Здесь вы найдете всю необходимую информацию о героях вашего
                приключения, от их имен и характеристик до уникальных историй и
                личных целей.
            </Typography>
        </Box>
        <Box>
            <Typography variant="h3" gutterBottom>
                Персонажи мастера
            </Typography>
            <Typography variant="body1" gutterBottom>
                Этот раздел представляет персонажей, которыми управляет мастер.
                От верных союзников до зловещих врагов, здесь вы найдете всех,
                кого герои могут встретить.
            </Typography>
        </Box>
        <Box>
            <Typography variant="h3" gutterBottom>
                Бестиарий
            </Typography>
            <Typography variant="body1" gutterBottom>
                Встречайте чудовищ и монстров вашего мира! Здесь вы найдете
                подробные описания существ, их способностей, поведения и мест
                обитания.
            </Typography>
        </Box>
        <Box>
            <Typography variant="h3" gutterBottom>
                Интересные места
            </Typography>
            <Typography variant="body1" gutterBottom>
                От тихих деревень до величественных замков, этот раздел содержит
                описание всех мест, которые герои могут исследовать во время
                своего путешествия.
            </Typography>
        </Box>
        <Box>
            <Typography variant="h3" gutterBottom>
                Артефакты и способности
            </Typography>
            <Typography variant="body1" gutterBottom>
                Здесь собраны все магические артефакты и уникальные способности,
                которые герои могут обнаружить во время своих приключений.
            </Typography>
        </Box>
        <Box>
            <Typography variant="h3" gutterBottom>
                Заметки
            </Typography>
            <Typography variant="body1" gutterBottom>
                Этот раздел предназначен для хранения ваших заметок,
                таинственных записок и карт, которые могут пригодиться во время
                игры.
            </Typography>
        </Box>
    </Stack>
);

export const CodexCard = observer(() => {
    const params = useParams();
    const navigate = useNavigate();
    const isMdScreen = useMediaQuery((theme: Theme) =>
        theme.breakpoints.up('md')
    );
    const { navigateWithSave } = useNavigateWithSave();
    const {
        codex: { currentPage, codexMenuList, loadPage, clearPage, setNavigate },
    } = useStores();

    const { openDrawer, closeDrawer } = useDrawer();

    const [tabData, setTabData] = React.useState<ITabData[]>([]);

    const [tabValue, setTabValue] = React.useState('');

    const [currentSection, setCurrentSection] =
        React.useState<ICodexMenuList | null>(null);

    const [codexSectionTitle, setCodexSectionTitle] = React.useState('');

    const [codexItemTitle, setCodexItemTitle] =
        React.useState('Кодекс мастера');

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
                label: 'Карта',
                content: (
                    <ImageGallery images={currentPage.maps} alt={mapName} />
                ),
            });
        }

        setTabData(newTabData);
        setTabValue(newTabData[0].id ?? '');
    }, [currentPage, params]);

    const getCurrentData = React.useCallback(() => {
        const newCurrentSection =
            codexMenuList.find((item) => item.section === params.section) ??
            null;
        const newCodexSectionTitle = currentSection?.title ?? '';
        const newCodexItemTitle =
            currentSection?.content.find((item) => item.id === params.id)
                ?.name ?? 'Кодекс мастера';

        setCurrentSection(newCurrentSection);
        setCodexSectionTitle(newCodexSectionTitle);
        setCodexItemTitle(newCodexItemTitle);
    }, [codexMenuList, currentSection, params]);

    const header = (
        <Stack p="1rem 0" bgcolor="background.paper" boxShadow={1} spacing={2}>
            <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
                p="0 1rem"
            >
                <Box>
                    <Typography variant="body2">{codexSectionTitle}</Typography>
                    <Typography fontWeight="500" variant="h2" component="h1">
                        {codexItemTitle}
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
                            onClick={() =>
                                openDrawer(
                                    <CodexMenuList
                                        params={params}
                                        onItemSelect={closeDrawer}
                                    />
                                )
                            }
                        >
                            <MenuOpen />
                        </IconButton>
                    </Tooltip>
                    {currentSection && (
                        <IconButton
                            onClick={() =>
                                navigateWithSave(
                                    NavigationRoute.codex,
                                    LastPageType.codex
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
                        <Tab key={tab.id} label={tab.label} value={tab.id} />
                    ))}
                </FullWidthTabs>
            )}
        </Stack>
    );

    const content = (
        <ScrollableBox bgcolor="paper">
            <Box p="1rem" sx={{ height: '100%' }}>
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
                    defaultContentText
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

    React.useEffect(() => {
        const { section, id } = params;

        if (section && id) {
            const fullPage = `${section}/cards/${id}`;
            loadPage(fullPage);

            return () => {
                clearPage();
            };
        }
    }, [clearPage, loadPage, params]);

    return (
        <Paper>
            <FlexHeightContainer header={header} content={content} />
        </Paper>
    );
});
