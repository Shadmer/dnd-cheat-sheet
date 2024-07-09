import React from 'react';
import { Typography, Box, Stack, Divider } from '@mui/material';
import { ICharacter } from '@src/interfaces';

interface CharacterContentProps {
    character: ICharacter;
}

export const CharacterContent: React.FC<CharacterContentProps> = ({
    character,
}) => {
    const renderPhysical = () => {
        const { appearance, health } = character.physical;
        if (!appearance && !health) return null;

        return (
            <>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Физические характеристики
                </Typography>
                <Typography paragraph textAlign="justify">
                    <b>Внешность:</b> {appearance || 'Не указана'}
                </Typography>
                <Typography paragraph textAlign="justify">
                    <b>Здоровье:</b> {health || 'Не указано'}
                </Typography>
            </>
        );
    };

    const renderSocial = () => {
        const { originAndStatus, educationAndSkills, familyAndConnections } =
            character.social;
        if (!originAndStatus && !educationAndSkills && !familyAndConnections)
            return null;

        return (
            <>
                <Typography
                    paragraph
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                >
                    Социальные аспекты
                </Typography>
                <Typography paragraph textAlign="justify">
                    <b>Происхождение и статус:</b>{' '}
                    {originAndStatus || 'Не указаны'}
                </Typography>
                <Typography paragraph textAlign="justify">
                    <b>Образование и навыки:</b>{' '}
                    {educationAndSkills || 'Не указаны'}
                </Typography>
                <Typography paragraph textAlign="justify">
                    <b>Семья и связи:</b> {familyAndConnections || 'Не указаны'}
                </Typography>
            </>
        );
    };

    const renderPsychological = () => {
        const {
            personality,
            motivesAndGoals,
            innerWorld,
            valuesAndBonds,
            weaknesses,
        } = character.psychological;
        const { traits, flaw } = personality;
        const { motives, goal } = motivesAndGoals;
        const { treasure, secret } = innerWorld;
        const { ideals, bonds } = valuesAndBonds;
        const { phobiasAndVulnerabilities } = weaknesses;

        if (
            !traits &&
            !flaw &&
            !motives &&
            !goal &&
            !treasure &&
            !secret &&
            !ideals &&
            !bonds &&
            !phobiasAndVulnerabilities
        )
            return null;

        return (
            <Stack spacing={2}>
                {(traits || flaw) && (
                    <>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Характер
                        </Typography>
                        {traits && (
                            <Typography paragraph textAlign="justify">
                                <b>Черты:</b> {traits}
                            </Typography>
                        )}
                        {flaw && (
                            <Typography paragraph textAlign="justify">
                                <b>Недостаток:</b> {flaw}
                            </Typography>
                        )}
                        <Divider />
                    </>
                )}

                {(motives || goal) && (
                    <>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Мотивы и цели
                        </Typography>
                        {motives && (
                            <Typography paragraph textAlign="justify">
                                <b>Мотивы:</b> {motives}
                            </Typography>
                        )}
                        {goal && (
                            <Typography paragraph textAlign="justify">
                                <b>Цель:</b> {goal}
                            </Typography>
                        )}
                        <Divider />
                    </>
                )}

                {(treasure || secret) && (
                    <>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Внутренний мир
                        </Typography>
                        {treasure && (
                            <Typography paragraph textAlign="justify">
                                <b>Сокровище:</b> {treasure}
                            </Typography>
                        )}
                        {secret && (
                            <Typography paragraph textAlign="justify">
                                <b>Секрет:</b> {secret}
                            </Typography>
                        )}
                        <Divider />
                    </>
                )}

                {(ideals || bonds) && (
                    <>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Ценности и привязанности
                        </Typography>
                        {ideals && (
                            <Typography paragraph textAlign="justify">
                                <b>Идеалы:</b> {ideals}
                            </Typography>
                        )}
                        {bonds && (
                            <Typography paragraph textAlign="justify">
                                <b>Привязанности:</b> {bonds}
                            </Typography>
                        )}
                        <Divider />
                    </>
                )}

                {phobiasAndVulnerabilities && (
                    <>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Слабости
                        </Typography>
                        <Typography paragraph textAlign="justify">
                            <b>Фобии и уязвимости:</b>{' '}
                            {phobiasAndVulnerabilities}
                        </Typography>
                    </>
                )}
            </Stack>
        );
    };

    return (
        <Stack spacing={2} pb={2}>
            <Box>
                <Typography fontStyle="italic">
                    {character.name} / {character.race} / {character.class}
                </Typography>

                <Typography textAlign="justify">
                    <b>Происхождение:</b> {character.background || 'Не указан'}
                </Typography>

                <Typography textAlign="justify">
                    <b>Мировоззрение:</b> {character.alignment || 'Не указано'}
                </Typography>
            </Box>

            {renderPhysical() && (
                <>
                    <Divider />
                    {renderPhysical()}
                </>
            )}

            {renderSocial() && (
                <>
                    <Divider />
                    {renderSocial()}
                </>
            )}

            {renderPsychological() && (
                <>
                    <Divider />
                    {renderPsychological()}
                </>
            )}
        </Stack>
    );
};
