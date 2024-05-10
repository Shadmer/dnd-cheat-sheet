import { Link as RouterLink, useParams } from 'react-router-dom';
import { Link } from '@mui/material';

export const EntryPage = () => {
    const params = useParams();
    return (
        <>
            <h2>{params.id}</h2>
            {/* <h1>dnd-cheat-sheet</h1>
            <Link component={RouterLink} to="/game/plot">
                Страница игры
            </Link> */}

            {/* <h1>MainPage</h1>
            <Link to="../">Вернуться на главную</Link>
            <Tabs
                value={value}
                onChange={(_, newValue: string) => setValue(newValue)}
                role="navigation"
            >
                <Tab
                    component={Link}
                    to="/game/plot"
                    value="/game/plot"
                    label="plot"
                />
                <Tab
                    component={Link}
                    to="/game/journey"
                    value="/game/journey"
                    label="journey"
                />
                <Tab
                    component={Link}
                    to="/game/battle"
                    value="/game/battle"
                    label="battle"
                />
                <Tab
                    component={Link}
                    to="/game/codex"
                    value="/game/codex"
                    label="codex"
                />
                <Tab
                    component={Link}
                    to="/game/interactive"
                    value="/game/interactive"
                    label="interactive"
                />
            </Tabs>
            <Outlet /> */}
        </>
    );
};
