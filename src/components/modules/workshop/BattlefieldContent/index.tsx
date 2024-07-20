import React from 'react';
import {
    IconButton,
    Tooltip,
    Box,
    Typography,
    Stack,
    Divider,
    Paper,
    useMediaQuery,
    useTheme,
    Unstable_Grid2 as Grid,
} from '@mui/material';
import {
    AiOutlineAppstoreAdd,
    AiOutlinePlayCircle,
    AiOutlineStop,
} from 'react-icons/ai';
import { CodexService } from '@src/services/CodexService';
import { useStores } from '@src/providers/RootStoreContext';
import { BattleUnitsDialog } from './BattleUnitsDialog';
import { IUnit } from './interfaces';
import { useCampaign } from '@src/providers/CampaignProvider';

export const BattlefieldContent = () => {
    const { fetchPage } = CodexService();
    const { currentCampaign } = useCampaign();
    const {
        codex: { menuList },
    } = useStores();

    const [selectedUnits, setSelectedUnits] = React.useState<IUnit[]>([]);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const savedUnits = localStorage.getItem('selectedUnits');
        if (savedUnits) {
            setSelectedUnits(JSON.parse(savedUnits));
        }
    }, []);

    React.useEffect(() => {
        localStorage.setItem('selectedUnits', JSON.stringify(selectedUnits));
    }, [selectedUnits]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleUnitClick = async (unit: IUnit) => {
        console.log('Selected Unit:', unit);
        // const response = await fetchPage(
        //     currentCampaign,
        //     unit.section,
        //     unit.parentId
        // );
        // console.log('data', response.creature);
    };

    const calculateInitiative = (dex: number): string => {
        const randomRoll = Math.floor(Math.random() * 20) + 1;
        const dexModifier = Math.floor((dex - 10) / 2);
        return (randomRoll + dexModifier).toString();
    };

    const parseHealthFormula = (formula: string): number | null => {
        const match = formula.match(/(\d+)к(\d+)(?:\s*\+\s*(\d+))?/);
        if (!match) return null;

        const [, numDice, diceSides, modifier] = match.map(Number);
        const diceRolls = Array.from(
            { length: numDice },
            () => Math.floor(Math.random() * diceSides) + 1
        ).reduce((sum, roll) => sum + roll, 0);

        return diceRolls + (modifier || 0);
    };

    const startBattle = async () => {
        console.log('Начать битву');
        console.log('selectedUnits', selectedUnits);

        const uniqueBestiaryUnits = Array.from(
            new Set(
                selectedUnits
                    .filter((unit) => unit.section === 'bestiary')
                    .map((unit) => unit.parentId)
            )
        );

        const uniqueCharacters = Array.from(
            new Set(
                selectedUnits
                    .filter((unit) => unit.section === 'characters')
                    .map((unit) => unit.parentId)
            )
        );

        const fetchUnitData = async (unitId: string, section: string) => {
            try {
                return await fetchPage(currentCampaign, section, unitId);
            } catch (error) {
                console.error(
                    `Ошибка загрузки данных для юнита ${unitId}:`,
                    error
                );
                return null;
            }
        };

        const updateUnits = async () => {
            const unitUpdates = await Promise.all([
                ...uniqueBestiaryUnits.map((id) =>
                    fetchUnitData(id, 'bestiary')
                ),
                ...uniqueCharacters.map((id) =>
                    fetchUnitData(id, 'characters')
                ),
            ]);

            const newSelectedUnits = selectedUnits.map((unit) => {
                if (!['bestiary', 'characters'].includes(unit.section)) {
                    return unit;
                }

                const unitData = unitUpdates.find(
                    (data) => data && data.creature
                );

                if (!unitData || !unitData.creature) {
                    return unit;
                }

                const { creature } = unitData;

                const initiative =
                    unit.initiative ||
                    calculateInitiative(creature.ability.dex);
                let maxHealth: string;
                let health: string;

                if (creature.hits.formula) {
                    const calculatedHealth = parseHealthFormula(
                        creature.hits.formula
                    );
                    if (calculatedHealth !== null) {
                        maxHealth = calculatedHealth.toString();
                        health = calculatedHealth.toString();
                    } else {
                        maxHealth = creature.hits.average.toString();
                        health = creature.hits.average.toString();
                    }
                } else {
                    maxHealth = creature.hits.average.toString();
                    health = creature.hits.average.toString();
                }

                return {
                    ...unit,
                    initiative,
                    maxHealth,
                    health,
                    armor: unit.armor || creature.armorClass.toString(),
                    speed: unit.speed || creature.speed,
                    isInBattle: true,
                };
            });

            setSelectedUnits(newSelectedUnits);
        };

        await updateUnits();
    };

    const endBattle = () => {
        console.log('Закончить битву');
    };

    const renderUnitsBySection = (section: string, title: string) => {
        const units = selectedUnits.filter((unit) => unit.section === section);

        if (units.length === 0) {
            return null;
        }

        return (
            <Box key={section}>
                <Typography variant="h4" mt={2}>
                    {title}
                </Typography>
                <Divider />
                <Grid container spacing={2} mt={2}>
                    {units.map((unit) => (
                        <Grid xs={12} sm={6} md={4} lg={3} key={unit.id}>
                            <Paper
                                sx={{
                                    padding: 2,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5',
                                    },
                                }}
                                onClick={() => handleUnitClick(unit)}
                            >
                                <Typography>{unit.name}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    };

    const theme = useTheme();
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Box>
            <Stack
                direction={isSmUp ? 'row' : 'column'}
                justifyContent="space-between"
                alignItems={isSmUp ? 'center' : 'flex-start'}
                borderBottom="1px solid #ccc"
                py={2}
                mb={2}
                spacing={isSmUp ? 0 : 2}
            >
                <Box>
                    <Typography variant="h5">Управление битвой</Typography>
                    <Typography variant="body2" color="textSecondary">
                        Выберите участников и начните сражение
                    </Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                    <Tooltip title="Выбрать участников битвы">
                        <IconButton onClick={handleOpen}>
                            <AiOutlineAppstoreAdd size={24} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Начать битву">
                        <IconButton onClick={startBattle}>
                            <AiOutlinePlayCircle size={24} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Закончить битву">
                        <IconButton onClick={endBattle}>
                            <AiOutlineStop size={24} />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Stack>

            <Box>
                {renderUnitsBySection('players', 'Игроки')}
                {renderUnitsBySection('custom', 'Созданные персонажи')}
                {renderUnitsBySection(
                    'characters',
                    'Именные персонажи мастера'
                )}
                {renderUnitsBySection('bestiary', 'Обычные персонажи мастера')}
            </Box>

            <BattleUnitsDialog
                open={open}
                onClose={handleClose}
                menuList={menuList}
                selectedUnits={selectedUnits}
                setSelectedUnits={setSelectedUnits}
            />
        </Box>
    );
};
