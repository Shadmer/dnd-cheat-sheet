import React from 'react';
import { useParams } from 'react-router-dom';

import {
    Card,
    CardActionArea,
    CardContent,
    Collapse,
    IconButton,
    Typography,
} from '@mui/material';
import { darken, lighten } from '@mui/material/styles';
import { ExpandMore } from '@mui/icons-material';
import { IPlotMenuItem } from '@src/interfaces/plot';
import { LastPageType, NavigationRoute } from '@src/constants/enums';
import { useNavigateWithSave } from '@src/providers/NavigateWithSaveProvider';
import { useCustomTheme } from '@src/providers/CustomThemeProvider';
type PlotMenuItemProps = {
    scene: IPlotMenuItem;
};

export const PlotMenuItem = ({
    scene: { sceneId, title, subTitle, description },
}: PlotMenuItemProps) => {
    const { scene } = useParams();
    const { navigateWithSave } = useNavigateWithSave();
    const { mode } = useCustomTheme();
    const [expanded, setExpanded] = React.useState(false);
    const navigateHandler = (id: string) => {
        const url = `${NavigationRoute.plot}/${id}`;
        navigateWithSave(url, LastPageType.scene);
    };

    return (
        <Card
            raised={scene === sceneId}
            sx={{
                position: 'relative',
                backgroundColor: (theme) => {
                    if (scene === sceneId) {
                        return mode === 'light'
                            ? lighten(theme.palette.primary.main, 0.8)
                            : darken(theme.palette.primary.main, 0.4);
                    }
                    return theme.palette.background.paper;
                },
                transition: 'background .3s',
            }}
        >
            <CardActionArea onClick={() => navigateHandler(sceneId)}>
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

            {description && (
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 6,
                        right: 6,
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
            )}

            <Collapse
                in={expanded}
                timeout="auto"
                unmountOnExit
                sx={{ cursor: 'auto' }}
            >
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};
