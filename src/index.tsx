import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import {
    ThemeProvider,
    createTheme,
    responsiveFontSizes,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './index.css';

import { RootStoreContext } from '@src/providers/rootStoreContext';
import RootStore from '@src/store/RootStore';

import { App } from './App';

const getCreateTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#f0f0f0',
        },
        primary: {
            main: '#1976d2',
        },
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

const theme = responsiveFontSizes(getCreateTheme);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <RootStoreContext.Provider value={new RootStore()}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <HashRouter>
                <App />
            </HashRouter>
        </ThemeProvider>
    </RootStoreContext.Provider>
);
