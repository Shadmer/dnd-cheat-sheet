import { Box, Paper, PaperProps } from '@mui/material';

type StyledPaperProps = PaperProps & {
    bgcolor?: 'paper' | 'default';
    disableCustomScroll?: boolean;
};

export const StyledPaper: React.FC<StyledPaperProps> = ({
    bgcolor = 'paper',
    disableCustomScroll,
    children,
    ...rest
}) => {
    return (
        <Box
            sx={{
                position: 'relative',
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
            <Paper
                sx={{
                    maxHeight: disableCustomScroll
                        ? 'auto'
                        : 'calc(100vh - 100px)',
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
                {...rest}
            >
                {children}
            </Paper>
        </Box>
    );
};
