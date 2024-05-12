import React from 'react';
import { Outlet, useParams } from 'react-router-dom';

import {
    Unstable_Grid2 as Grid,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { Search } from '@mui/icons-material';

import { PlotMenuList } from '@src/components/PlotMenuList';
import { useStores } from '@src/rootStoreContext';

export const PlotPage = () => {
    // const {
    //     plot: { loadPlots, plots },
    // } = useStores();

    const { scene } = useParams();

    const [plots, setPlots] = React.useState<any | null>(null);

    const menuGridWidth = React.useMemo(
        () => (scene ? { xs: 12, sm: 4, md: 3 } : { xs: 12 }),
        [scene]
    );

    const fetchData = async () => {
        const response = await fetch('/data/plots.json', {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
        const data = await response.json();

        setPlots(data);
    };

    React.useEffect(() => {
        fetchData();
    }, []);

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
                    <Stack direction="row" alignItems="flex-end" spacing={1}>
                        <Search />
                        <TextField
                            label="Поиск..."
                            size="small"
                            variant="standard"
                            sx={{ width: '100%' }}
                        />
                    </Stack>
                    {plots && <PlotMenuList plots={plots} />}
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
