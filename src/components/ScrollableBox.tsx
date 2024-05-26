import React from 'react';
import { Box } from '@mui/material';

type ScrollableBoxProps = {
    children: React.ReactNode;
    bgcolor?: 'paper' | 'default';
    disableCustomScroll?: boolean;
    maxHeight?: string;
};

export const ScrollableBox: React.FC<ScrollableBoxProps> = ({
    children,
    bgcolor = 'paper',
    disableCustomScroll,
    maxHeight = 'inherit',
}) => {
    return (
        <Box
            sx={{
                position: 'relative',
                maxHeight,
                '&::before, &::after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    right: '6px',
                    height: '15px',
                    pointerEvents: 'none',
                    zIndex: 1,
                    backdropFilter: 'blur(2px)',
                    display: disableCustomScroll ? 'none' : 'block',
                },
                '&::before': {
                    top: 0,
                },
                '&::after': {
                    bottom: 0,
                },
            }}
        >
            <Box
                sx={{
                    maxHeight: disableCustomScroll ? 'auto' : 'inherit',
                    overflow: disableCustomScroll ? 'hidden' : 'scroll',
                    overflowX: 'hidden',
                    background: (theme) => theme.palette.background[bgcolor],
                    '&::-webkit-scrollbar-thumb': {
                        background: (theme) => theme.palette.primary.main,
                        borderRadius: '3px',
                        display: 'none',
                    },
                    '&::-webkit-scrollbar': {
                        width: 'var(--border-width)',
                    },
                    '&:hover::-webkit-scrollbar-thumb': {
                        display: 'block',
                    },
                }}
            >
                {children}
            </Box>
        </Box>
    );
};
