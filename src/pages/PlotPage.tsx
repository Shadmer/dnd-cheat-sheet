import React from 'react';
import { useParams } from 'react-router-dom';

import {
    Unstable_Grid2 as Grid,
    List,
    ListItemButton,
    ListItemText,
    ListSubheader,
    Paper,
} from '@mui/material';
import { PlotCard } from '@src/components/PlotCard';
import { StyledPaper } from '@src/components/StyledPaper';

export const PlotPage = () => {
    const { scene } = useParams();

    const menuGridWidth = React.useMemo(
        () => (scene ? { xs: 12, sm: 4, md: 3 } : { xs: 12 }),
        [scene]
    );

    return (
        <Grid container spacing={2}>
            <Grid {...menuGridWidth}>
                <Paper>
                    <List
                        sx={{
                            bgcolor: 'background.paper',
                            padding: 0,
                        }}
                    >
                        <ListSubheader>Глава 1</ListSubheader>
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <ListItemButton key={item}>
                                <ListItemText primary={`Сцена ${item}`} />
                            </ListItemButton>
                        ))}
                    </List>
                </Paper>
            </Grid>
            {scene && (
                <Grid xs={12} sm={8} md={9}>
                    <StyledPaper>
                        <PlotCard scene={scene} />
                    </StyledPaper>
                </Grid>
            )}
        </Grid>
    );
};
