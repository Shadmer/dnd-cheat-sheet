import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
    Card,
    CardActions,
    CardContent,
    Collapse,
    IconButton,
    Typography,
} from '@mui/material';
import { ArrowForwardIos, ExpandMore, Info } from '@mui/icons-material';

interface PlotMenuItemProps {
    item: string;
}

export const PlotMenuItem = ({ item }: PlotMenuItemProps) => {
    const { scene } = useParams();
    const navigate = useNavigate();
    // const [expanded, setExpanded] = React.useState(false);

    return (
        <Card
            raised={scene === item}
            sx={{
                backgroundColor: (theme) =>
                    scene === item
                        ? theme.palette.grey[300]
                        : theme.palette.background.paper,
                transition: 'background .3s',
                cursor: 'pointer',
            }}
            onClick={() => navigate(`./${item}`)}
        >
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Сцена {item}
                </Typography>
                <Typography variant="h5">У Золтара</Typography>
            </CardContent>
            {/* <CardActions>
                <IconButton
                    sx={{
                        transform: !expanded
                            ? 'rotate(0deg)'
                            : 'rotate(180deg)',
                        transition: 'transform .3s',
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setExpanded(!expanded);
                    }}
                >
                    <ExpandMore />
                </IconButton>
            </CardActions>
            <Collapse
                in={expanded}
                timeout="auto"
                unmountOnExit
                sx={{ cursor: 'auto' }}
            >
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Dolores culpa, blanditiis tempora ut doloribus
                        commodi ex praesentium cupiditate sapiente soluta
                        reiciendis quidem iure porro quam. Alias harum quam
                        velit ad!
                    </Typography>
                </CardContent>
            </Collapse> */}
        </Card>
    );
};
