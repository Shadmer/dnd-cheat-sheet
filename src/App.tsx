import { Navigate, useRoutes } from 'react-router-dom';
import { EntryPage } from '@src/pages/EntryPage';
import { MainPage } from '@src/pages/MainPage';
import { PlotPage } from '@src/pages/PlotPage';
import { JourneyPage } from '@src/pages/JourneyPage';
import { BattlePage } from '@src/pages/BattlePage';
import { CodexPage } from '@src/pages/CodexPage';
import { InteractivePage } from '@src/pages/InteractivePage';

export const App = () =>
    useRoutes([
        // { path: '/', element: <EntryPage /> },
        { path: '/', element: <Navigate to="game/plot" /> },
        {
            path: 'game',
            element: <MainPage />,
            children: [
                { path: 'plot/:scene?', element: <PlotPage /> },
                { path: 'journey', element: <JourneyPage /> },
                { path: 'battle', element: <BattlePage /> },
                { path: 'codex', element: <CodexPage /> },
                { path: 'interactive', element: <InteractivePage /> },
                { path: '*', element: <Navigate to="" /> },
            ],
        },
        // { path: '*', element: <Navigate to="/" /> },
    ]);
