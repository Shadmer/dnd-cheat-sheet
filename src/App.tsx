import { Navigate, useRoutes } from 'react-router-dom';
import { useAuth } from '@src/providers/AuthProvider';
import { EntryPage } from '@src/pages/EntryPage';
import { MainPage } from '@src/pages/MainPage';
import { PlotPage } from '@src/pages/PlotPage';
import { JourneyPage } from '@src/pages/JourneyPage';
import { BattlePage } from '@src/pages/BattlePage';
import { CodexPage } from '@src/pages/CodexPage';
import { PrinterPage } from '@src/pages/PrinterPage';

export const App = () => {
    const { isAuthenticated } = useAuth();

    return useRoutes([
        {
            path: '/',
            element: isAuthenticated ? (
                <Navigate to="/game" replace />
            ) : (
                <EntryPage />
            ),
        },
        {
            path: 'game',
            element: isAuthenticated ? (
                <MainPage />
            ) : (
                <Navigate to="/" replace />
            ),
            children: [
                { path: '', element: <Navigate to="plot" replace /> },
                { path: 'plot/:scene?', element: <PlotPage /> },
                // { path: 'journey', element: <JourneyPage /> },
                // { path: 'battle', element: <BattlePage /> },
                { path: 'codex/:section?/:id?', element: <CodexPage /> },
                { path: 'printer', element: <PrinterPage /> },
                { path: '*', element: <Navigate to="plot" replace /> },
            ],
        },
        { path: '*', element: <Navigate to="/" replace /> },
    ]);
};
