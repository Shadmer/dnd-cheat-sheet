import { Paper, PaperProps } from '@mui/material';

type StyledPaperProps = PaperProps;

export const StyledPaper: React.FC<StyledPaperProps> = ({
    children,
    ...rest
}) => {
    return (
        <Paper
            sx={{
                maxHeight: 'calc(100vh - 100px)',
                overflow: 'auto',
                padding: '2rem',
                '&::-webkit-scrollbar': {
                    width: '6px',
                    display: 'none',
                },
                '&:hover::-webkit-scrollbar': {
                    display: 'block',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: (theme) => theme.palette.primary.main,
                    borderRadius: '3px',
                },
            }}
            {...rest}
        >
            {children}
        </Paper>
    );
};
