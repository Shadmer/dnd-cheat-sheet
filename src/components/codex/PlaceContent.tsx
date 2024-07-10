import React from 'react';
import {
    Typography,
    Box,
    Stack,
    Divider,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import { IPlace } from '@src/interfaces';

interface PlaceContentProps {
    place: IPlace;
}

export const PlaceContent: React.FC<PlaceContentProps> = ({ place }) => {
    const renderDescription = () => {
        const { appearance, atmosphere, history } = place.description;
        return (
            <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Описание
                </Typography>
                <Typography paragraph textAlign="justify">
                    <b>Внешний вид:</b> {appearance || 'Не указана'}
                </Typography>
                <Typography paragraph textAlign="justify">
                    <b>Атмосфера:</b> {atmosphere || 'Не указана'}
                </Typography>
                <Typography paragraph textAlign="justify">
                    <b>История:</b> {history || 'Не указана'}
                </Typography>
            </Box>
        );
    };

    const renderInhabitants = () => {
        const { mainInhabitants, importantCharacters } = place.inhabitants;
        return (
            <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Обитатели
                </Typography>
                <Typography textAlign="justify">
                    <b>Основные обитатели:</b> {mainInhabitants || 'Не указаны'}
                </Typography>
                {importantCharacters.length > 0 && (
                    <>
                        <List dense>
                            {importantCharacters.map((character, index) => (
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
                                                    {character.name}
                                                </Typography>
                                                {`: ${character.value}`}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </>
                )}
            </Box>
        );
    };

    const renderFeatures = () => {
        const { landmarks, dangers, resources } = place.features;
        return (
            <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Особенности
                </Typography>
                <Typography paragraph textAlign="justify">
                    <b>Достопримечательности:</b>{' '}
                    {landmarks.join(', ') || 'Не указаны'}
                </Typography>
                <Typography paragraph textAlign="justify">
                    <b>Опасности:</b> {dangers.join(', ') || 'Не указаны'}
                </Typography>
                <Typography paragraph textAlign="justify">
                    <b>Ресурсы:</b> {resources.join(', ') || 'Не указаны'}
                </Typography>
            </Box>
        );
    };

    return (
        <Stack spacing={2}>
            <Box>
                <Typography fontStyle="italic" textAlign="justify">
                    {place.location}
                </Typography>
            </Box>

            <Divider />
            {renderDescription()}

            <Divider />
            {renderInhabitants()}

            <Divider />
            {renderFeatures()}
        </Stack>
    );
};
