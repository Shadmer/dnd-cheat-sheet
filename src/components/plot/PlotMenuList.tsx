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
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { SearchOff } from '@mui/icons-material';
import { useStores } from '@src/providers/RootStoreContext';
import { ScrollableBox } from '@src/components/common/ScrollableBox';
import { PlotMenuItem } from '@src/components/plot/PlotMenuItem';
import { FlexHeightContainer } from '@src/components/common/FlexHeightContainer';
import { IPlotMenuItem } from '@src/interfaces';

export const PlotMenuList = observer(() => {
    const { scene } = useParams();
    const theme = useTheme();

    const {
        plot: { filterPlotMenuList, loadPlotMenuList, filteredPlotMenuList },
    } = useStores();

    const searchInputRef = React.useRef<HTMLInputElement>(null);
    const [searchTitle, setSearchTitle] = React.useState('');

    const menuGridWidth = React.useMemo(
        () => (scene ? { xs: 12 } : { xs: 12, md: 6, lg: 4 }),
        [scene]
    );

    const isXs = useMediaQuery(theme.breakpoints.only('xs'));
    const isMd = useMediaQuery(theme.breakpoints.only('md'));

    const sceneMarginBottom = React.useCallback(
        (
            menuListIndex: number,
            menuListLength: number,
            partIndex: number,
            partLength: number
        ) => {
            const itemsPerRow = (() => {
                if (isXs || scene) return 1;
                if (isMd) return 2;
                return 3;
            })();

            const isLastPart = menuListIndex === menuListLength;
            const elementsInLastRow = partLength % itemsPerRow || itemsPerRow;
            const isInLastRow = partIndex > partLength - elementsInLastRow;

            return isLastPart && isInLastRow ? 0 : '1rem';
        },
        [isXs, isMd, scene]
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
                <SearchOff fontSize="small" />
            </IconButton>
        </InputAdornment>
    );

    const header = (
        <Stack spacing={2} pb={2}>
            <Typography variant="h3" component="h3">
                Сюжет
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
        <ScrollableBox>
            <React.Fragment>
                {groupedPlotMenuList.length ? (
                    groupedPlotMenuList.map((part, menuListIndex) => (
                        <Box key={part.partTitle}>
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
                            <Grid container spacing={2} rowSpacing={0}>
                                {part.scenes.map((sceneItem, partIndex) => (
                                    <Grid
                                        key={sceneItem.sceneId}
                                        {...menuGridWidth}
                                        sx={{
                                            mb: sceneMarginBottom(
                                                menuListIndex + 1,
                                                groupedPlotMenuList.length,
                                                partIndex + 1,
                                                part.scenes.length
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
                    <Typography mt={2} variant="body2" color="text.secondary">
                        Ничего не найдено
                    </Typography>
                )}
            </React.Fragment>
        </ScrollableBox>
    );

    return <FlexHeightContainer header={header} content={content} />;
});
