import React from 'react';
import { Skeleton, CardContent, Typography } from '@mui/material';

export const SkeletonLoading = () => (
    <>
        <Skeleton variant="rectangular" height={140} />
        <CardContent>
            <Typography variant="h5">
                <Skeleton />
            </Typography>
            <Typography variant="body2" color="textSecondary">
                <Skeleton />
                <Skeleton width="80%" />
            </Typography>
        </CardContent>
    </>
);
