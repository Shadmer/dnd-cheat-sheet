import React from 'react';
import { useParams } from 'react-router-dom';

import { StyledPaper } from '@src/components/StyledPaper';
import { PlotScene } from '@src/components/PlotScene';
import { Box } from '@mui/material';

export const PlotCard = () => {
    const { scene } = useParams();

    return (
        <StyledPaper>
            <Box p="2rem">
                <PlotScene scene={scene ?? ''} />
            </Box>
        </StyledPaper>
    );
};
