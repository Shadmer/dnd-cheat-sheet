import React from 'react';
import {
    Box,
    Typography,
    Stack,
    Divider,
    useMediaQuery,
    useTheme,
    IconButton,
    Tooltip,
    Unstable_Grid2 as Grid,
} from '@mui/material';
import { GiAxeSword, GiBattleGear, GiSandsOfTime } from 'react-icons/gi';
import { CodexService } from '@src/services/CodexService';
import { useStores } from '@src/providers/RootStoreContext';
import { useCampaign } from '@src/providers/CampaignProvider';
import { useDialog } from '@src/providers/DialogProvider';
import { ICreature } from '@src/interfaces/codex';
import { CreatureCard } from '@src/components/modules/codex/CreatureContent';

import { IUnit, UnitSections } from './interfaces';
import { UnitCard } from './UnitCard';
import { BattleUnitsModal } from './BattleUnitsModal';
import { EditUnitModal } from './EditUnitModal';
import { InitiativeUnitsModal } from './InitiativeUnitsModal';

export const BattlefieldContent: React.FC = () => {
    // Получение темы и определение точки прерывания для рендеринга
    const theme = useTheme();
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

    // Получение необходимых функций и данных из контекстов
    const { fetchPage } = CodexService();
    const { currentCampaign } = useCampaign();
    const { openDialog } = useDialog();
    const {
        codex: { menuList },
    } = useStores();

    // Определение состояний для модальных окон и выбранных юнитов
    const [selectedUnits, setSelectedUnits] = React.useState<IUnit[]>([]);
    const [battleModalOpen, setBattleModalOpen] =
        React.useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = React.useState<boolean>(false);
    const [unitToEdit, setUnitToEdit] = React.useState<IUnit | null>(null);
    const [initiativeModalOpen, setInitiativeModalOpen] =
        React.useState<boolean>(false);

    // Проверка, есть ли среди выбранных юнитов те, которые участвуют в битве
    const isSomeIsInBattle = React.useMemo(
        () => selectedUnits.some((unit) => unit.isInBattle),
        [selectedUnits]
    );

    // Функция для открытия модального окна с информацией о юните
    const handleUnitModalOpen = async (unitId: string, section: string) => {
        const unit = (await fetchPage(currentCampaign, section, unitId))
            .creature;

        if (!unit) return;

        const unitContent = <CreatureCard creature={unit} />;

        openDialog(unit.name.rus, unitContent);
    };

    // Функция для вычисления инициативы
    const calculateInitiative = (dex: number): string => {
        const randomRoll = Math.floor(Math.random() * 20) + 1;
        const dexModifier = Math.floor((dex - 10) / 2);
        return (randomRoll + dexModifier).toString();
    };

    // Функция для парсинга формулы здоровья
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

    // Функция для получения уникальных ID юнитов из выбранных
    const getUniqueUnitIds = (units: IUnit[], section: string): string[] => {
        return Array.from(
            new Set(
                units
                    .filter((unit) => unit.section === section)
                    .map((unit) => unit.parentId)
            )
        );
    };

    // Функция для загрузки данных о юнитах
    const fetchUnitData = async (unitIds: string[], section: string) => {
        const unitDataMap: { [key: string]: ICreature } = {};
        const promises = unitIds.map(async (id) => {
            const data = await fetchPage(currentCampaign, section, id);
            if (data && data.creature) {
                unitDataMap[id] = data.creature;
            }
        });
        await Promise.all(promises);
        return unitDataMap;
    };

    // Функция для обновления выбранных юнитов
    const updateSelectedUnits = (
        units: IUnit[],
        bestiaryData: { [key: string]: ICreature },
        characterData: { [key: string]: ICreature }
    ): IUnit[] => {
        return units.map((unit) => {
            let creature;
            if (unit.section === UnitSections.bestiary) {
                creature = bestiaryData[unit.parentId];
            } else if (unit.section === UnitSections.characters) {
                creature = characterData[unit.parentId];
            }

            if (!creature) {
                return unit;
            }

            const initiative =
                unit.initiative || calculateInitiative(creature.ability.dex);
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
                initiative: unit.initiative || initiative,
                maxHealth: unit.maxHealth || maxHealth,
                health: unit.health || health,
                armor: unit.armor || creature.armorClass.toString(),
                isInBattle: unit.isInBattle ?? true,
            };
        });
    };

    // Функция для начала битвы
    const startBattle = async () => {
        const uniqueBestiaryUnits = getUniqueUnitIds(
            selectedUnits,
            UnitSections.bestiary
        );
        const uniqueCharacters = getUniqueUnitIds(
            selectedUnits,
            UnitSections.characters
        );

        const [bestiaryData, characterData] = await Promise.all([
            fetchUnitData(uniqueBestiaryUnits, UnitSections.bestiary),
            fetchUnitData(uniqueCharacters, UnitSections.characters),
        ]);

        const newSelectedUnits = updateSelectedUnits(
            selectedUnits,
            bestiaryData,
            characterData
        );

        setSelectedUnits(newSelectedUnits);
    };

    const handleDamage = (id: string, amount: number) => {
        setSelectedUnits((units) =>
            units.map((unit) =>
                unit.id === id
                    ? {
                          ...unit,
                          health: Math.max(
                              0,
                              parseInt(unit.health) - amount
                          ).toString(),
                      }
                    : unit
            )
        );
    };

    const handleHeal = (id: string, amount: number) => {
        setSelectedUnits((units) =>
            units.map((unit) =>
                unit.id === id
                    ? {
                          ...unit,
                          health: Math.min(
                              parseInt(unit.maxHealth),
                              parseInt(unit.health) + amount
                          ).toString(),
                      }
                    : unit
            )
        );
    };

    const openEditModal = (unit: IUnit) => {
        setUnitToEdit(unit);
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
        setUnitToEdit(null);
    };

    const handleEditChange = (editedUnit: IUnit) => {
        setSelectedUnits((units) =>
            units.map((unit) => (unit.id === editedUnit.id ? editedUnit : unit))
        );
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
                        <Grid xs={12} sm={6} lg={4} key={unit.id}>
                            <UnitCard
                                unit={unit}
                                openUnitModal={handleUnitModalOpen}
                                makeDamage={handleDamage}
                                makeHeal={handleHeal}
                                openEditModal={openEditModal}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    };

    // Загрузка сохраненных юнитов из localStorage при первой загрузке компонента
    React.useEffect(() => {
        const savedUnits = localStorage.getItem('selectedUnits');
        if (savedUnits) {
            setSelectedUnits(JSON.parse(savedUnits));
        }
    }, []);

    // Сохранение выбранных юнитов в localStorage при их изменении
    React.useEffect(() => {
        localStorage.setItem('selectedUnits', JSON.stringify(selectedUnits));
    }, [selectedUnits]);

    return (
        <Box>
            <Stack
                direction={isSmUp ? 'row' : 'column'}
                justifyContent="space-between"
                alignItems={isSmUp ? 'center' : 'flex-start'}
                py={2}
                mb={2}
                spacing={isSmUp ? 0 : 2}
            >
                <Box>
                    <Typography variant="h5">Управление битвой</Typography>
                    <Typography variant="body2" color="textSecondary">
                        Выберите участников, начните сражение и отслеживайте
                        очередь хода
                    </Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                    <Tooltip title="Выбрать участников">
                        <IconButton onClick={() => setBattleModalOpen(true)}>
                            <GiBattleGear size={24} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Начать битву">
                        <Box>
                            <IconButton
                                onClick={startBattle}
                                disabled={!selectedUnits.length}
                            >
                                <GiAxeSword size={24} />
                            </IconButton>
                        </Box>
                    </Tooltip>
                    <Tooltip title="Очередь хода">
                        <Box>
                            <IconButton
                                onClick={() => setInitiativeModalOpen(true)}
                                disabled={!isSomeIsInBattle}
                            >
                                <GiSandsOfTime size={24} />
                            </IconButton>
                        </Box>
                    </Tooltip>
                </Stack>
            </Stack>

            <Box>
                {renderUnitsBySection(UnitSections.players, 'Игроки')}
                {renderUnitsBySection(
                    UnitSections.custom,
                    'Созданные персонажи'
                )}
                {renderUnitsBySection(
                    UnitSections.characters,
                    'Именные персонажи мастера'
                )}
                {renderUnitsBySection(
                    UnitSections.bestiary,
                    'Обычные персонажи мастера'
                )}
            </Box>

            <BattleUnitsModal
                open={battleModalOpen}
                onClose={() => setBattleModalOpen(false)}
                menuList={menuList}
                selectedUnits={selectedUnits}
                setSelectedUnits={setSelectedUnits}
            />

            <EditUnitModal
                unit={unitToEdit}
                open={editModalOpen}
                onClose={closeEditModal}
                handleEditChange={handleEditChange}
            />

            <InitiativeUnitsModal
                open={initiativeModalOpen}
                onClose={() => setInitiativeModalOpen(false)}
                selectedUnits={selectedUnits}
                setSelectedUnits={setSelectedUnits}
            />
        </Box>
    );
};
