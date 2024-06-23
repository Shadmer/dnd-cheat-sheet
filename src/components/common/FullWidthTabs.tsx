import { Tabs, styled } from '@mui/material';

export const FullWidthTabs = styled(Tabs)(({ theme }) => ({
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.primary.main,
    '& .MuiTabs-flexContainer': {
        width: '100%',
    },
    '& .MuiTab-root': {
        flexGrow: 1,
        maxWidth: 'none',
    },
    '& .Mui-disabled': {
        color: theme.palette.grey[400],
        opacity: '1 !important',
    },
}));
