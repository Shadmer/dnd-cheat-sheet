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
} from '@mui/material';
import {
    AutoDelete,
    CloudDownload,
    Delete,
    Downloading,
    Menu,
    MenuOpen,
} from '@mui/icons-material';

import { useStores } from '@src/providers/RootStoreContext';
import { ImageGallery } from '@src/components/common/ImageGallery';
import { FlexHeightContainer } from '@src/components/common/FlexHeightContainer';
import { ScrollableBox } from '@src/components/common/ScrollableBox';

export const PrinterPage: React.FC = observer(() => {
    const {
        print: {
            loadPrintMenuList,
            sections,
            loadedImages,
            toggleImageLoad,
            loadedImagesUrls,
            loadAllImages,
            unloadAllImages,
        },
    } = useStores();

    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const componentRef = React.useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    React.useEffect(() => {
        loadPrintMenuList();
    }, [loadPrintMenuList]);

    const isImageLoaded = React.useCallback(
        (id: string) => loadedImages.includes(id),
        [loadedImages]
    );

    const handleDrawerToggle = () => {
        setDrawerOpen((prevState) => !prevState);
    };

    const drawerHeader = (
        <Stack direction="row" alignItems="center" p={2}>
            <Typography variant="h4" sx={{ flexGrow: 1 }} noWrap>
                Меню загрузки
            </Typography>
            <Tooltip title="Закрыть меню">
                <IconButton onClick={handleDrawerToggle}>
                    <MenuOpen />
                </IconButton>
            </Tooltip>
        </Stack>
    );

    const drawerContent = (
        <ScrollableBox>
            <Box sx={{ width: 300 }}>
                <List sx={{ padding: 2 }}>
                    {sections.map((sectionItem) => (
                        <Box key={sectionItem.section} mb={4}>
                            <Typography variant="h4" gutterBottom>
                                {sectionItem.title}
                            </Typography>
                            <Divider />
                            {sectionItem.content.map((contentItem) => (
                                <ListItem key={contentItem.id}>
                                    <ListItemText primary={contentItem.name} />
                                    <ListItemSecondaryAction>
                                        <Tooltip
                                            placement="right"
                                            title={
                                                isImageLoaded(contentItem.id)
                                                    ? 'Удалить'
                                                    : 'Загрузить'
                                            }
                                        >
                                            <IconButton
                                                onClick={() =>
                                                    toggleImageLoad(contentItem)
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
                    ))}
                </List>
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
                    <Menu />
                </IconButton>
                <Typography variant="h4" sx={{ flexGrow: 1 }} noWrap>
                    Меню загрузки
                </Typography>
                <Tooltip title="Загрузить всё">
                    <IconButton onClick={loadAllImages}>
                        <Downloading />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Удалить всё">
                    <IconButton onClick={unloadAllImages}>
                        <AutoDelete />
                    </IconButton>
                </Tooltip>
            </Stack>
            <Divider />
        </Box>
    );

    const content = (
        <ScrollableBox>
            <Box ref={componentRef} sx={{ height: '100%' }}>
                <ImageGallery images={loadedImagesUrls} print />
            </Box>
        </ScrollableBox>
    );

    const footer = (
        <Stack pb={2} alignItems="flex-end">
            <Button
                variant="contained"
                color="primary"
                onClick={handlePrint}
                sx={{ mt: 2 }}
                disabled={!loadedImagesUrls.length}
            >
                Печать изображений
            </Button>
        </Stack>
    );

    return (
        <Box>
            <FlexHeightContainer
                header={header}
                content={content}
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
