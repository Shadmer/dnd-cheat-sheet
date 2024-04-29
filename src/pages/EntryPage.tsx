import { Link as RouterLink } from "react-router-dom"
import { Link } from "@mui/material"

export const EntryPage = () => {
    return (
        <>
            <h1>dnd-cheat-sheet</h1>
            <Link
                component={RouterLink}
                to='/game/plot'
            >
                Страница игры
            </Link>
        </>
    )
}
