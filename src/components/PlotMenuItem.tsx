import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
    Card,
    CardActionArea,
    CardContent,
    Collapse,
    IconButton,
    Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { IPlotMenuItem } from '@src/interfaces';

type PlotMenuItemProps = {
    scene: IPlotMenuItem;
};

export const PlotMenuItem = ({
    scene: { sceneId, title, subTitle, desc },
}: PlotMenuItemProps) => {
    const { scene } = useParams();
    const navigate = useNavigate();
    const [expanded, setExpanded] = React.useState(false);

    return (
        <Card
            raised={scene === sceneId}
            sx={{
                position: 'relative',
                backgroundColor: (theme) =>
                    scene === sceneId
                        ? theme.palette.grey[300]
                        : theme.palette.background.paper,
                transition: 'background .3s',
            }}
        >
            <CardActionArea onClick={() => navigate(`../plot/${sceneId}`)}>
                <CardContent>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            width: 'calc(100% - 40px)',
                        }}
                    >
                        {subTitle}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: expanded ? 'wrap' : 'nowrap',
                            width: 'calc(100% - 40px)',
                        }}
                    >
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>

            <IconButton
                color="primary"
                sx={{
                    position: 'absolute',
                    top: 6,
                    right: 6,
                    transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)',
                    transition: 'transform .3s',
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    setExpanded(!expanded);
                }}
            >
                <ExpandMore />
            </IconButton>

            <Collapse
                in={expanded}
                timeout="auto"
                unmountOnExit
                sx={{ cursor: 'auto' }}
            >
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {desc}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};
