import React from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import {
    Box,
    Unstable_Grid2 as Grid,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { Clear } from '@mui/icons-material';
import { useStores } from '@src/providers/rootStoreContext';
import { ScrollableBox } from '@src/components/common/ScrollableBox';
import { PlotMenuItem } from '@src/components/plot/PlotMenuItem';
import { FlexHeightContainer } from '@src/components/common/FlexHeightContainer';
import { IPlotMenuItem } from '@src/interfaces';

export const PlotMenuList = observer(() => {
    const { scene } = useParams();

    const {
        plot: { filterPlotMenuList, loadPlotMenuList, filteredPlotMenuList },
    } = useStores();

    const searchInputRef = React.useRef<HTMLInputElement>(null);
    const [searchTitle, setSearchTitle] = React.useState('');

    const menuGridWidth = React.useMemo(
        () => (scene ? { xs: 12 } : { xs: 12, md: 6, lg: 4 }),
        [scene]
    );

    const groupedPlotMenuList = React.useMemo(() => {
        const groupedParts = filteredPlotMenuList.reduce((acc, item) => {
            if (!acc[item.part]) {
                acc[item.part] = {
                    partTitle: item.part,
                    scenes: [],
                };
            }
            acc[item.part].scenes.push(item);
            return acc;
        }, {} as Record<string, { partTitle: string; scenes: IPlotMenuItem[] }>);

        return Object.values(groupedParts);
    }, [filteredPlotMenuList]);

    const getMarginBottom = (
        index: number,
        length: number,
        value: string,
        isPart = false
    ) => {
        if (!scene && !isPart) return 0;

        return index === length - 1 ? 0 : value;
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchTitle(value);
        filterPlotMenuList(value);
    };

    const handleReset = () => {
        setSearchTitle('');
        filterPlotMenuList('');
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    React.useEffect(() => {
        loadPlotMenuList();
    }, [loadPlotMenuList]);

    const searchIcon = (
        <InputAdornment position="start">
            <IconButton onClick={handleReset} color="primary">
                <Clear fontSize="small" />
            </IconButton>
        </InputAdornment>
    );

    const header = (
        <Stack spacing={2} pb={2}>
            <Typography variant="h3" component="h3">
                Сцены
            </Typography>
            <Stack
                direction="row"
                alignItems="flex-end"
                spacing={1}
                sx={{
                    width: scene ? 'calc(100% - var(--border-width))' : '100%',
                }}
            >
                <TextField
                    inputRef={searchInputRef}
                    placeholder="Поиск..."
                    size="small"
                    variant="standard"
                    sx={{ width: '100%' }}
                    value={searchTitle}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: searchIcon,
                    }}
                />
            </Stack>
        </Stack>
    );

    const content = (
        <ScrollableBox bgcolor="default" disableCustomScroll={!scene}>
            <Box>
                {groupedPlotMenuList.length ? (
                    groupedPlotMenuList.map((part) => (
                        <Box
                            key={part.partTitle}
                            mb="2rem"
                            sx={{
                                mb: getMarginBottom(
                                    groupedPlotMenuList.indexOf(part),
                                    groupedPlotMenuList.length,
                                    '2rem',
                                    true
                                ),
                            }}
                        >
                            <Box
                                sx={{
                                    mb: 1,
                                    p: '.7rem',
                                    borderRadius: 1,
                                    background: (theme) =>
                                        theme.palette.primary.main,
                                    color: (theme) =>
                                        theme.palette.primary.contrastText,
                                }}
                            >
                                <Typography variant="h5" gutterBottom>
                                    {part.partTitle}
                                </Typography>
                            </Box>
                            <Grid container spacing={scene ? 0 : 2}>
                                {part.scenes.map((sceneItem) => (
                                    <Grid
                                        key={sceneItem.sceneId}
                                        {...menuGridWidth}
                                        sx={{
                                            mb: getMarginBottom(
                                                part.scenes.indexOf(sceneItem),
                                                part.scenes.length,
                                                '1rem'
                                            ),
                                        }}
                                    >
                                        <PlotMenuItem scene={sceneItem} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    ))
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        Ничего не найдено
                    </Typography>
                )}
            </Box>
        </ScrollableBox>
    );

    return (
        <Box>
            <FlexHeightContainer header={header} content={content} />
        </Box>
    );
});
