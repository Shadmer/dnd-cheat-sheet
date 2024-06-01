import React, { ReactNode } from 'react';

import { RootStoreContext } from '@src/providers/rootStoreContext';
import RootStore from '@src/store/RootStore';

import { PaletteMode, CssBaseline } from '@mui/material';

import {
    ThemeProvider,
    createTheme,
    responsiveFontSizes,
} from '@mui/material/styles';

type ProvidersProps = Readonly<{
    children: ReactNode;
}>;

const paletteLight = {
    primary: {
        main: '#5c6bc0',
        light: '#8e99f3',
        dark: '#26418f',
        contrastText: '#fff',
    },
    secondary: {
        main: '#f57c00',
        light: '#ffb74d',
        dark: '#bb4d00',
        contrastText: '#fff',
    },
    background: {
        default: '#f0f0f0',
        paper: '#fff',
    },
};

const paletteDark = {};

const getCreateTheme = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light' ? paletteLight : paletteDark),
    },
    typography: {
        h1: {
            fontSize: '2rem',
            '& em, & strong': {
                fontSize: 'inherit',
            },
        },
        h2: {
            fontSize: '1.75rem',
            '& em, & strong': {
                fontSize: 'inherit',
            },
        },
        h3: {
            fontSize: '1.5rem',
            '& em, & strong': {
                fontSize: 'inherit',
            },
        },
        h4: {
            fontSize: '1.25rem',
            '& em, & strong': {
                fontSize: 'inherit',
            },
        },
        h5: {
            fontSize: '1rem',
            '& em, & strong': {
                fontSize: 'inherit',
            },
        },
        h6: {
            fontSize: '0.875rem',
            '& em, & strong': {
                fontSize: 'inherit',
            },
        },
    },
});

export const Providers = ({ children }: ProvidersProps) => {
    const mode = 'light';

    const theme = React.useMemo(
        () => createTheme(getCreateTheme(mode)),
        [mode]
    );

    return (
        <RootStoreContext.Provider value={new RootStore()}>
            <ThemeProvider theme={responsiveFontSizes(theme)}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </RootStoreContext.Provider>
    );
};
