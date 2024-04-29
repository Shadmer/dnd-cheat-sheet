import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom"
import { Tab, Tabs } from "@mui/material"


export const MainPage = () => {
    const location = useLocation();
    const [value, setValue] = React.useState(location.pathname || '/game/plot');

    return (
        <>
            <h1>MainPage</h1>
            <Link to='../'>Вернуться на главную</Link>
            <Tabs
                value={value}
                onChange={(_, newValue: string) => setValue(newValue)}
                role="navigation"
            >
                <Tab
                    component={Link}
                    to="/game/plot"
                    value='/game/plot'
                    label='plot'
                />
                <Tab
                    component={Link}
                    to="/game/journey"
                    value='/game/journey'
                    label='journey'
                />
                <Tab
                    component={Link}
                    to="/game/battle"
                    value='/game/battle'
                    label='battle'
                />
                <Tab
                    component={Link}
                    to="/game/codex"
                    value='/game/codex'
                    label='codex'
                />
                <Tab
                    component={Link}
                    to="/game/interactive"
                    value='/game/interactive'
                    label='interactive'
                />
            </Tabs>
            <Outlet />
        </>
    )
}
