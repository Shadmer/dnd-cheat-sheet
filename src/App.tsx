import { Navigate, useRoutes } from 'react-router-dom';
import { useAuth } from '@src/providers/AuthProvider';
import { EntryPage } from '@src/pages/EntryPage';
import { MainPage } from '@src/pages/MainPage';
import { PlotPage } from '@src/pages/PlotPage';
import { CodexPage } from '@src/pages/CodexPage';
import { WorkshopPage } from '@src/pages/WorkshopPage';
import { PrinterPage } from '@src/pages/PrinterPage';
import { CampaignPage } from '@src/pages/CampaignPage';

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
                { path: '', element: <Navigate to="campaign" replace /> },
                { path: 'plot/:scene?', element: <PlotPage /> },
                { path: 'codex/:section?/:id?', element: <CodexPage /> },
                { path: 'workshop/:section?/:id?', element: <WorkshopPage /> },
                { path: 'printer', element: <PrinterPage /> },
                { path: 'campaign', element: <CampaignPage /> },
                { path: '*', element: <Navigate to="campaign" replace /> },
            ],
        },
        { path: '*', element: <Navigate to="/" replace /> },
    ]);
};
