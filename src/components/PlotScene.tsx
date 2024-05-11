import React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface PlotSceneProps {
    scene: string;
}

export const PlotScene = ({ scene }: PlotSceneProps) => {
    return (
        <>
            <Link to="../">Закрыть</Link>
            <Typography variant="h4" component="h2">
                {scene}
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
