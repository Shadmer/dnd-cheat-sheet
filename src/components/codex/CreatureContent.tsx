import React from 'react';
import {
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    Stack,
    Divider,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { ICreature } from '@src/interfaces';

interface CreatureCardProps {
    creature: ICreature;
}

export const CreatureCard: React.FC<CreatureCardProps> = ({ creature }) => {
    const abilityNames: { [key: string]: string } = {
        str: 'Сил',
        dex: 'Лов',
        con: 'Тел',
        int: 'Инт',
        wiz: 'Мдр',
        cha: 'Хар',
    };

    const getStatWithModifier = (stat: number) => {
        const modifier = Math.floor((stat - 10) / 2);
        const modifierSign = modifier >= 0 ? '+' : '';

        return `${stat} (${modifierSign}${modifier})`;
    };

    return (
        <Stack spacing={2}>
            <Box>
                <Typography fontStyle="italic">
                    {creature.size} {creature.type}, {creature.alignment}
                </Typography>

                <Typography>
                    <b>Класс доспеха:</b> {creature.armorClass}
                </Typography>

                <Typography>
                    <b>Хиты:</b> {creature.hits.average} (
                    {creature.hits.formula})
                </Typography>

                <Typography>
                    <b>Скорость:</b> {creature.speed}
                </Typography>
            </Box>

            <Divider />

            <Box>
                <Typography variant="h6" gutterBottom>
                    Характеристики
                </Typography>
                <Grid container spacing={1}>
                    {Object.entries(creature.ability).map(([key, value]) => (
                        <Grid key={key} xs={4} md={4} lg={1}>
                            <Typography
                                align="center"
                                p={0.5}
                                border="1px solid"
                                borderBottom="1px dotted"
                            >
                                {abilityNames[key]}
                            </Typography>
                            <Typography
                                align="center"
                                p={0.5}
                                border="1px solid"
                                borderTop="none"
                            >
                                {getStatWithModifier(value)}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Divider />

            <Box>
                <Typography variant="h6" gutterBottom>
                    Дополнительная информация
                </Typography>
                <Typography>
                    <b>Уровень опасности:</b> {creature.challengeRating}
                </Typography>
                <Typography>
                    <b>Бонус мастерства:</b> {creature.proficiencyBonus}
                </Typography>
            </Box>

            <Divider />

            <Box>
                <Typography variant="h6" gutterBottom>
                    Спасброски
                </Typography>
                <Typography>
                    {creature.savingThrows
                        .map(
                            (savingThrow) =>
                                `${savingThrow.name}: ${savingThrow.value}`
                        )
                        .join(', ')}
                </Typography>
            </Box>

            <Divider />

            <Box>
                <Typography variant="h6" gutterBottom>
                    Иммунитеты
                </Typography>
                <Typography>
                    <b>К урону:</b>{' '}
                    {creature.damageImmunities.length
                        ? creature.damageImmunities.join(', ')
                        : 'Нет'}
                </Typography>
                <Typography>
                    <b>К состояниям:</b>{' '}
                    {creature.conditionImmunities.length
                        ? creature.conditionImmunities.join(', ')
                        : 'Нет'}
                </Typography>
            </Box>

            <Divider />

            <Box>
                <Typography variant="h6" gutterBottom>
                    Чувства
                </Typography>
                <Typography>
                    Пассивное восприятие: {creature.senses.passivePerception}
                </Typography>
                <Typography>
                    {creature.senses.senses
                        .map((sense) => `${sense.name}: ${sense.value}`)
                        .join(', ')}
                </Typography>
            </Box>

            <Divider />

            <Box>
                <Typography variant="h6" gutterBottom>
                    Языки
                </Typography>
                <Typography>{creature.languages.join(', ')}</Typography>
            </Box>

            <Divider />

            <Box>
                <Typography variant="h6" gutterBottom>
                    Места обитания
                </Typography>
                <Typography>
                    {creature.areas.length
                        ? creature.areas.join(', ')
                        : 'Не известно'}
                </Typography>
            </Box>

            <Divider />

            <Box>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Особенности
                </Typography>
                <List dense>
                    {creature.feats.map((feat, index) => (
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
                                            {feat.name}
                                        </Typography>
                                        {`: ${feat.value}`}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Divider />

            <Box>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Действия
                </Typography>
                <List dense>
                    {creature.actions.map((action, index) => (
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
                                            {action.name}
                                        </Typography>
                                        {`: ${action.value}`}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Stack>
    );
};
