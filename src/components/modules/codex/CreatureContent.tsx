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
import { IProperty } from '@src/interfaces/common';
import { ICreature } from '@src/interfaces/codex';
import { MarkdownRenderer } from '@src/components/common/MarkdownRenderer';

interface CreatureCardProps {
    creature: ICreature;
}

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

const renderSection = (title: string, content: React.ReactNode) => (
    <Box>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
            {title}
        </Typography>
        {content}
    </Box>
);

const hasData = (data?: IProperty[] | string[]): boolean => !!data?.length;

const hasSenses = (senses: {
    passivePerception: string;
    senses?: IProperty[];
}): boolean => !!(senses.passivePerception || senses.senses?.length);

export const CreatureCard: React.FC<CreatureCardProps> = ({ creature }) => {
    const abilityStats = (
        <Grid container spacing={1}>
            {Object.entries(creature.ability).map(([key, value]) => (
                <Grid key={key} xs={6} md={4} lg={2}>
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
    );

    const additionalInfo = (
        <>
            <Typography>
                <b>Уровень опасности:</b> {creature.challengeRating}
            </Typography>
            <Typography>
                <b>Бонус мастерства:</b> {creature.proficiencyBonus}
            </Typography>
        </>
    );

    const savingThrows = (
        <Typography>
            {creature.savingThrows
                ?.map(
                    (savingThrow) => `${savingThrow.name}: ${savingThrow.value}`
                )
                .join(', ')}
        </Typography>
    );

    const skills = (
        <Typography>
            {creature.skills
                ?.map((skill) => `${skill.name}: ${skill.value}`)
                .join(', ')}
        </Typography>
    );

    const immunities = (
        <>
            {hasData(creature.damageImmunities) && (
                <Typography>
                    <b>К урону:</b> {creature.damageImmunities?.join(', ')}
                </Typography>
            )}
            {hasData(creature.conditionImmunities) && (
                <Typography>
                    <b>К состояниям:</b>{' '}
                    {creature.conditionImmunities?.join(', ')}
                </Typography>
            )}
            {hasData(creature.damageResistances) && (
                <Typography>
                    <b>Сопротивление:</b>{' '}
                    {creature.damageResistances?.join(', ')}
                </Typography>
            )}
        </>
    );

    const senses = (
        <>
            <Typography>
                Пассивное восприятие: {creature.senses.passivePerception}
            </Typography>
            {hasData(creature.senses.senses) && (
                <Typography>
                    {creature.senses.senses
                        ?.map((sense) => `${sense.name}: ${sense.value}`)
                        .join(', ')}
                </Typography>
            )}
        </>
    );

    const languages = (
        <Typography>
            {creature.languages?.join(', ') || 'Не владеет'}
        </Typography>
    );

    const feats = (
        <List dense>
            {creature.feats?.map((feat, index) => (
                <ListItem
                    key={index}
                    disableGutters
                    sx={{ paddingTop: 0, paddingBottom: 0 }}
                >
                    <ListItemText
                        primary={
                            <Typography component={Box} textAlign="justify">
                                <Typography component="span" fontWeight="bold">
                                    {feat.name}
                                </Typography>
                                <MarkdownRenderer
                                    markdown={feat.value.toString()}
                                />
                            </Typography>
                        }
                    />
                </ListItem>
            ))}
        </List>
    );

    const actions = (
        <List dense>
            {creature.actions?.map((action, index) => (
                <ListItem
                    key={index}
                    disableGutters
                    sx={{ paddingTop: 0, paddingBottom: 0 }}
                >
                    <ListItemText
                        primary={
                            <Typography component={Box} textAlign="justify">
                                <Typography component="span" fontWeight="bold">
                                    {action.name}
                                </Typography>
                                <MarkdownRenderer
                                    markdown={action.value.toString()}
                                />
                            </Typography>
                        }
                    />
                </ListItem>
            ))}
        </List>
    );

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

            {renderSection('Характеристики', abilityStats)}

            <Divider />

            {(creature.challengeRating || creature.proficiencyBonus) && (
                <>
                    {renderSection('Дополнительная информация', additionalInfo)}
                    <Divider />
                </>
            )}

            {hasData(creature.savingThrows) && (
                <>
                    {renderSection('Спасброски', savingThrows)}
                    <Divider />
                </>
            )}

            {hasData(creature.skills) && (
                <>
                    {renderSection('Навыки', skills)}
                    <Divider />
                </>
            )}

            {(hasData(creature.damageImmunities) ||
                hasData(creature.conditionImmunities) ||
                hasData(creature.damageResistances)) && (
                <>
                    {renderSection('Иммунитеты', immunities)}
                    <Divider />
                </>
            )}

            {hasSenses(creature.senses) && (
                <>
                    {renderSection('Чувства', senses)}
                    <Divider />
                </>
            )}

            {hasData(creature.languages) && (
                <>
                    {renderSection('Языки', languages)}
                    <Divider />
                </>
            )}

            {hasData(creature.feats) && (
                <>
                    {renderSection('Особенности', feats)}
                    <Divider />
                </>
            )}

            {hasData(creature.actions) && (
                <>{renderSection('Действия', actions)}</>
            )}
        </Stack>
    );
};
