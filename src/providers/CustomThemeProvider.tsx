import React, { ReactNode } from 'react';
import {
    ThemeProvider,
    createTheme,
    responsiveFontSizes,
    PaletteMode,
    CssBaseline,
} from '@mui/material';

const paletteLight = {
    primary: {
        main: '#3a506b',
        light: '#5c728f',
        dark: '#1c2541',
        contrastText: '#fff',
    },
    secondary: {
        main: '#ff8c42',
        light: '#ffbb70',
        dark: '#c65c00',
        contrastText: '#fff',
    },
    background: {
        default: '#f0f0f0',
        paper: '#fff',
    },
};

const paletteDark = {
    primary: {
        main: '#5c728f',
        light: '#7890ab',
        dark: '#3a506b',
        contrastText: '#fff',
    },
    secondary: {
        main: '#ff8c42',
        light: '#ffbb70',
        dark: '#c65c00',
        contrastText: '#fff',
    },
    background: {
        default: '#1c1f2b',
        paper: '#2b2f3a',
    },
};

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

type ThemeContextProps = {
    mode: PaletteMode;
    toggleTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextProps | null>(null);

export const useCustomTheme = () => {
    const context = React.useContext(ThemeContext);
    if (!context) {
        throw new Error(
            'useThemeContext must be used within a ThemeProviderContext'
        );
    }
    return context;
};

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = React.useState<PaletteMode>(() => {
        const savedMode = localStorage.getItem('theme');
        return savedMode ? (savedMode as PaletteMode) : 'light';
    });

    const theme = React.useMemo(
        () => createTheme(getCreateTheme(mode)),
        [mode]
    );

    const toggleTheme = () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('theme', newMode);
    };

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={responsiveFontSizes(theme)}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
