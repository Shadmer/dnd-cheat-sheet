import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import { ScrollableBox } from '@src/components/common/ScrollableBox';
import { MarkdownRenderer } from '@src/components/common/MarkdownRenderer';
import { FlexHeightContainer } from '@src/components/common/FlexHeightContainer';
import { CodexMenuList } from '@src/components/codex/CodexMenuList';
import { FullWidthTabs } from '@src/components/common/FullWidthTabs';
import { LastPageType, NavigationRoute } from '@src/enums';
import { useNavigateWithSave } from '@src/providers/NavigateWithSaveProvider';

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

    const [tabValue, setTabValue] = React.useState(0);

    const currentSection = codexMenuList.find(
        (item) => item.section === params.section
    );

    const codexSectionTitle = currentSection?.title ?? '';

    const defaultContentText = (
        <Stack spacing={2}>
            <Box>
                <Typography variant="h3" gutterBottom>
                    Игроки
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Здесь вы найдете всю необходимую информацию о героях вашего
                    приключения, от их имен и характеристик до уникальных
                    историй и личных целей.
                </Typography>
            </Box>
            <Box>
                <Typography variant="h3" gutterBottom>
                    Персонажи мастера
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Этот раздел представляет персонажей, которыми управляет
                    мастер. От верных союзников до зловещих врагов, здесь вы
                    найдете всех, кого герои могут встретить.
                </Typography>
            </Box>
            <Box>
                <Typography variant="h3" gutterBottom>
                    Бестиарий
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Встречайте чудовищ и монстров вашего мира! Здесь вы найдете
                    подробные описания существ, их способностей, поведения и
                    мест обитания.
                </Typography>
            </Box>
            <Box>
                <Typography variant="h3" gutterBottom>
                    Интересные места
                </Typography>
                <Typography variant="body1" gutterBottom>
                    От тихих деревень до величественных замков, этот раздел
                    содержит описание всех мест, которые герои могут исследовать
                    во время своего путешествия.
                </Typography>
            </Box>
            <Box>
                <Typography variant="h3" gutterBottom>
                    Артефакты и способности
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Здесь собраны все магические артефакты и уникальные
                    способности, которые герои могут обнаружить во время своих
                    приключений.
                </Typography>
            </Box>
            <Box>
                <Typography variant="h3" gutterBottom>
                    Заметки
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Этот раздел предназначен для хранения ваших заметок,
                    таинственных записок и карт, которые могут пригодиться во
                    время игры.
                </Typography>
            </Box>
        </Stack>
    );

    const codexItemTitle =
        currentSection?.content.find((item) => item.id === params.id)?.name ??
        'Кодекс мастера';

    const tabData = [
        { label: 'Характеристики', content: 'Характеристики' },
        { label: 'Описание', content: 'Описание' },
        { label: 'Изображения', content: 'Изображения' },
        { label: 'Карты', content: 'Карты' },
    ];

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
                            color="primary"
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
                            color="primary"
                            sx={{ ml: 'auto' }}
                        >
                            <Clear />
                        </IconButton>
                    )}
                </Stack>
            </Stack>
            {currentSection && (
                <FullWidthTabs
                    value={tabValue}
                    onChange={(_, newValue) => setTabValue(newValue)}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                >
                    {tabData.map((tab, index) => (
                        <Tab key={index} label={tab.label} value={index} />
                    ))}
                </FullWidthTabs>
            )}
        </Stack>
    );

    const content = (
        <ScrollableBox bgcolor="paper">
            <Box p="1rem">
                {currentSection ? (
                    <Box>
                        {tabData.map((tab, index) => (
                            <Box key={index} hidden={tabValue !== index}>
                                <Typography>{tab.content}</Typography>
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
        if (isMdScreen) closeDrawer();
    }, [closeDrawer, isMdScreen]);

    React.useEffect(() => {
        setNavigate(navigate);
    }, [navigate, setNavigate]);

    React.useEffect(() => {
        const { section, id } = params;

        if (section && id) {
            const fullPage = `${section}/${id}`;
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
