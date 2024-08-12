import React from 'react';
import {
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    Stack,
    Divider,
    ListItemIcon,
    Tooltip,
} from '@mui/material';

import { GiCursedStar, GiHeartPlus, GiHolySymbol } from 'react-icons/gi';
import { SiCurseforge } from 'react-icons/si';

import { IArtifact } from '@src/interfaces/codex';

interface ArtifactContentProps {
    artifact: IArtifact;
}

export const ArtifactContent: React.FC<ArtifactContentProps> = ({
    artifact,
}) => {
    const features = !!artifact.features.length && (
        <>
            <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Особенности
                </Typography>

                <List dense>
                    {artifact.features.map((feature, index) => (
                        <ListItem
                            key={index}
                            disableGutters
                            sx={{ paddingTop: 0, paddingBottom: 0 }}
                        >
                            <ListItemText
                                primary={
                                    <Typography textAlign="justify">
                                        <Typography
                                            component="span"
                                            fontWeight="bold"
                                        >
                                            {feature.name}
                                        </Typography>
                                        {`: ${feature.value}`}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Divider />
        </>
    );

    const blessings = (!!artifact.blessings.small.length ||
        !!artifact.blessings.basic.length) && (
        <Box>
            {!!artifact.blessings.small.length && (
                <>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Малые благословления
                    </Typography>
                    <List dense>
                        {artifact.blessings.small.map((blessing, index) => (
                            <ListItem
                                key={index}
                                disableGutters
                                sx={{ paddingTop: 0, paddingBottom: 0 }}
                            >
                                <ListItemText
                                    primary={
                                        <Typography textAlign="justify">
                                            <Typography
                                                component="span"
                                                fontWeight="bold"
                                            >
                                                {blessing.name}
                                            </Typography>
                                            {`: ${blessing.value}`}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </>
            )}

            {!!artifact.blessings.basic.length && (
                <>
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        mt={2}
                        gutterBottom
                    >
                        Обычные благословления
                    </Typography>
                    <List dense>
                        {artifact.blessings.basic.map((blessing, index) => (
                            <ListItem
                                key={index}
                                disableGutters
                                sx={{ paddingTop: 0, paddingBottom: 0 }}
                            >
                                <ListItemText
                                    primary={
                                        <Typography textAlign="justify">
                                            <Typography
                                                component="span"
                                                fontWeight="bold"
                                            >
                                                {blessing.name}
                                            </Typography>
                                            {`: ${blessing.value}`}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </>
            )}
        </Box>
    );

    const curses = (!!artifact.curses.small.length ||
        !!artifact.curses.basic.length) && (
        <Box>
            {!!artifact.curses.small.length && (
                <>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Малые проклятия
                    </Typography>
                    <List dense>
                        {artifact.curses.small.map((curse, index) => (
                            <ListItem
                                key={index}
                                disableGutters
                                sx={{ paddingTop: 0, paddingBottom: 0 }}
                            >
                                <ListItemText
                                    primary={
                                        <Typography textAlign="justify">
                                            <Typography
                                                component="span"
                                                fontWeight="bold"
                                            >
                                                {curse.name}
                                            </Typography>
                                            {`: ${curse.value}`}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </>
            )}

            {!!artifact.curses.basic.length && (
                <>
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        mt={2}
                        gutterBottom
                    >
                        Обычные проклятия
                    </Typography>
                    <List dense>
                        {artifact.curses.basic.map((curse, index) => (
                            <ListItem
                                key={index}
                                disableGutters
                                sx={{ paddingTop: 0, paddingBottom: 0 }}
                            >
                                <ListItemText
                                    primary={
                                        <Typography textAlign="justify">
                                            <Typography
                                                component="span"
                                                fontWeight="bold"
                                            >
                                                {curse.name}
                                            </Typography>
                                            {`: ${curse.value}`}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </>
            )}
        </Box>
    );

    const destruction = !!artifact.destruction.length && (
        <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                Условия уничтожения
            </Typography>
            <List dense>
                {artifact.destruction.map((condition, index) => (
                    <ListItem
                        key={index}
                        disableGutters
                        sx={{ paddingTop: 0, paddingBottom: 0 }}
                    >
                        <ListItemText
                            primary={
                                <Typography textAlign="justify">
                                    - {condition}
                                </Typography>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Stack spacing={2}>
            <Box>
                <Typography fontStyle="italic">
                    {artifact.type} / {artifact.rarity}
                </Typography>

                <Typography>
                    <b>Требуется настройка:</b>{' '}
                    {artifact.customization ? 'Да' : 'Нет'}
                </Typography>

                <Typography>
                    <b>Цена:</b> {artifact.cost}
                </Typography>
            </Box>

            <Divider />

            {features}

            {blessings}

            {curses}

            {destruction}
        </Stack>
    );
};
