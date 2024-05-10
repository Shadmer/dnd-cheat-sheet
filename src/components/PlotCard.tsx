import React from 'react';
import { Typography } from '@mui/material';

interface PlotCardProps {
    scene: string;
}

export const PlotCard = ({ scene }: PlotCardProps) => {
    return (
        <>
            <Typography variant="h4" component="h2">
                Сцена: {scene}
            </Typography>
            <Typography variant="body1" style={{ height: '110vh' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe,
                eveniet ratione. Dolore nulla soluta neque ex officiis mollitia
                sit obcaecati rerum, eligendi ut laboriosam placeat quasi
                voluptatem, delectus vero commodi.
            </Typography>
        </>
    );
};
