import React from 'react';
import { observer } from 'mobx-react-lite';
import { useReactToPrint } from 'react-to-print';
import {
    Box,
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Divider,
    IconButton,
    Stack,
    Tooltip,
    Drawer,
    CircularProgress,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import {
    AutoDelete,
    Close,
    CloudDownload,
    Delete,
    Downloading,
    MenuOpen,
} from '@mui/icons-material';
import { GiSpiralArrow, GiBranchArrow } from 'react-icons/gi';
import { useCampaign } from '@src/providers/CampaignProvider';
import { useStores } from '@src/providers/RootStoreContext';
import { ImageGallery } from '@src/components/common/ImageGallery';
import { FlexHeightContainer } from '@src/components/common/FlexHeightContainer';
import { ScrollableBox } from '@src/components/common/ScrollableBox';

export const PrinterPage: React.FC = observer(() => {
    const theme = useTheme();
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
    const { currentCampaign } = useCampaign();
    const {
        codex: { menuList },
        print: {
            getPrintMenuList,
            sections,
            loadedImages,
            toggleImageLoad,
            loadedImagesUrls,
            loadAllImages,
            unloadAllImages,
            menuListLoading,
        },
    } = useStores();

    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const componentRef = React.useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const isImageLoaded = React.useCallback(
        (id: string) => loadedImages.includes(id),
        [loadedImages]
    );

    const handleDrawerToggle = () => {
        setDrawerOpen((prevState) => !prevState);
    };

    React.useEffect(() => {
        getPrintMenuList(currentCampaign, menuList);
    }, [currentCampaign, getPrintMenuList, menuList]);

    const drawerHeader = (
        <Stack direction="row" alignItems="center" p={2}>
            <Typography variant="h4" sx={{ flexGrow: 1 }} noWrap>
                Меню загрузки
            </Typography>
            <IconButton onClick={handleDrawerToggle}>
                <Close />
            </IconButton>
        </Stack>
    );

    const drawerContent = (
        <ScrollableBox>
            <Box sx={{ width: 300, height: '100%' }}>
                {menuListLoading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    <List sx={{ padding: 2 }}>
                        {sections.length ? (
                            sections.map((sectionItem) => (
                                <Box key={sectionItem.section} mb={4}>
                                    <Typography variant="h4" gutterBottom>
                                        {sectionItem.title}
                                    </Typography>
                                    <Divider />
                                    {sectionItem.content.map((contentItem) => (
                                        <ListItem key={contentItem.id}>
                                            <ListItemText
                                                primary={contentItem.name}
                                            />
                                            <ListItemSecondaryAction>
                                                <Tooltip
                                                    placement="right"
                                                    title={
                                                        isImageLoaded(
                                                            contentItem.id
                                                        )
                                                            ? 'Удалить'
                                                            : 'Загрузить'
                                                    }
                                                >
                                                    <IconButton
                                                        onClick={() =>
                                                            toggleImageLoad(
                                                                contentItem
                                                            )
                                                        }
                                                        edge="end"
                                                    >
                                                        {isImageLoaded(
                                                            contentItem.id
                                                        ) ? (
                                                            <Delete />
                                                        ) : (
                                                            <CloudDownload />
                                                        )}
                                                    </IconButton>
                                                </Tooltip>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))}
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body2" gutterBottom>
                                Ничего не найдено
                            </Typography>
                        )}
                    </List>
                )}
            </Box>
        </ScrollableBox>
    );

    const header = (
        <Box>
            <Stack direction="row" alignItems="center" spacing={2}>
                <IconButton
                    color="inherit"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2 }}
                >
                    <MenuOpen />
                </IconButton>
                <Typography variant="h4" sx={{ flexGrow: 1 }} noWrap>
                    Изображения для печати
                </Typography>
                <Tooltip
                    title={
                        sections.length
                            ? 'Загрузить всё'
                            : 'Нет изображений для загрузки'
                    }
                >
                    <Box>
                        <IconButton
                            onClick={loadAllImages}
                            disabled={menuListLoading || !sections.length}
                        >
                            <Downloading />
                        </IconButton>
                    </Box>
                </Tooltip>
                <Tooltip
                    title={
                        loadedImages.length
                            ? 'Удалить всё'
                            : 'Нет изображений для удаления'
                    }
                >
                    <Box>
                        <IconButton
                            onClick={unloadAllImages}
                            disabled={!loadedImages.length}
                        >
                            <AutoDelete />
                        </IconButton>
                    </Box>
                </Tooltip>
            </Stack>
            <Divider />
        </Box>
    );

    const content = (
        <ScrollableBox>
            {loadedImagesUrls.length ? (
                <Box ref={componentRef} sx={{ height: '100%' }}>
                    <ImageGallery images={loadedImagesUrls} noLightBox />
                </Box>
            ) : (
                <Box position="relative" fontSize="calc(var(--index) * 2.5)">
                    <Typography
                        sx={{
                            display: !isSmUp ? 'block' : 'none',
                            position: 'absolute',
                            top: 100,
                            left: 0,
                            right: 0,
                            textAlign: 'center',
                            fontFamily: 'ofont',
                            fontSize: 'calc(var(--index) * 1.5)',
                        }}
                    >
                        Управление загрузкой <br /> и удалением печати
                    </Typography>

                    <Box
                        sx={{
                            position: 'absolute',
                            top: 20,
                            left: 40,
                            rotate: '190deg',
                        }}
                    >
                        <GiBranchArrow />
                    </Box>

                    <Typography
                        sx={{
                            display: isSmUp ? 'block' : 'none',
                            position: 'absolute',
                            top: 150,
                            left: 0,
                            rotate: '-10deg',
                            fontFamily: 'ofont',
                            fontSize: 'calc(var(--index) * 1)',
                        }}
                    >
                        Перейти к меню <br />
                        загрузки изображений
                    </Typography>

                    <Box
                        sx={{
                            position: 'absolute',
                            top: 20,
                            right: 40,
                            rotate: '-90deg',
                        }}
                    >
                        <GiSpiralArrow />
                    </Box>

                    <Typography
                        sx={{
                            display: isSmUp ? 'block' : 'none',
                            position: 'absolute',
                            top: 120,
                            right: 0,
                            rotate: '20deg',
                            fontFamily: 'ofont',
                            fontSize: 'calc(var(--index) * 1)',
                        }}
                    >
                        Кнопки быстрой загрузки и <br />
                        удаления всех изображений
                    </Typography>
                </Box>
            )}
        </ScrollableBox>
    );

    const footer = (
        <Stack pb={2} alignItems="flex-end">
            {!!loadedImagesUrls.length && (
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={handlePrint}
                    sx={{ mt: 2 }}
                >
                    Печать изображений
                </Button>
            )}
        </Stack>
    );

    const loader = (
        <ScrollableBox>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                <CircularProgress />
            </Box>
        </ScrollableBox>
    );

    return (
        <Box>
            <FlexHeightContainer
                header={header}
                content={menuListLoading ? loader : content}
                footer={footer}
            />
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawerToggle}
            >
                <FlexHeightContainer
                    header={drawerHeader}
                    content={drawerContent}
                    customHeight="100dvh"
                />
            </Drawer>
        </Box>
    );
});
