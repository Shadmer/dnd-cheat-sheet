import { Tabs, styled } from '@mui/material';
import { darken, lighten } from '@mui/material/styles';
import { useCustomTheme } from '@src/providers/CustomThemeProvider';

export const FullWidthTabs = styled(Tabs)(({ theme }) => {
    const { mode } = useCustomTheme();

    return {
        backgroundColor:
            mode === 'light'
                ? lighten(theme.palette.primary.light, 0.8)
                : darken(theme.palette.primary.light, 0.5),
        '& .MuiTabs-flexContainer': {
            width: '100%',
        },
        '& .MuiTab-root': {
            flexGrow: 1,
            maxWidth: 'none',
        },
        '& .Mui-disabled': {
            opacity: '0.2 !important',
        },
        '& .MuiTab-root.Mui-selected': {
            color: mode === 'dark' && theme.palette.common.white,
        },
    };
});
