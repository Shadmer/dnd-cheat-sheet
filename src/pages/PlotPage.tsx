import React from 'react';
import { Outlet, useParams } from 'react-router-dom';

import {
    Unstable_Grid2 as Grid,
    IconButton,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { Clear, Search } from '@mui/icons-material';

import { PlotMenuList } from '@src/components/PlotMenuList';
import { useStores } from '@src/providers/rootStoreContext';

export const PlotPage = () => {
    const { scene } = useParams();
    const {
        plot: { filterPlotMenuList },
    } = useStores();

    const [searchTitle, setSearchTitle] = React.useState('');

    const menuGridWidth = React.useMemo(
        () => (scene ? { xs: 12, sm: 4, md: 3 } : { xs: 12 }),
        [scene]
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchTitle(value);
        filterPlotMenuList(value);
    };

    const handleReset = () => {
        setSearchTitle('');
        filterPlotMenuList('');
    };

    return (
        <Grid container spacing={2}>
            <Grid
                {...menuGridWidth}
                sx={{
                    display: {
                        xs: scene ? 'none' : 'block',
                        sm: 'block',
                    },
                }}
            >
                <Stack spacing={2}>
                    <Typography variant="h4" component="h4">
                        Сцены
                    </Typography>
                    <Stack
                        direction="row"
                        alignItems="flex-end"
                        spacing={1}
                        sx={{
                            width: scene
                                ? 'calc(100% - var(--border-width))'
                                : '100%',
                        }}
                    >
                        <Search />
                        <TextField
                            label="Поиск..."
                            size="small"
                            variant="standard"
                            sx={{ width: '100%' }}
                            value={searchTitle}
                            onChange={handleSearchChange}
                        />
                        <IconButton onClick={handleReset}>
                            <Clear fontSize="small" />
                        </IconButton>
                    </Stack>
                    <PlotMenuList />
                </Stack>
            </Grid>
            {scene && (
                <Grid xs={12} sm={8} md={9}>
                    <Outlet />
                </Grid>
            )}
        </Grid>
    );
};
