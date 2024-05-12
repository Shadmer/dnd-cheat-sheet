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

import { RootStoreContext } from '@src/rootStoreContext';
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
