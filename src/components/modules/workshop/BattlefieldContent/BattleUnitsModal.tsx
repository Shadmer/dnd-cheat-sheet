import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Stack,
    TextField,
    Typography,
    IconButton,
    Box,
    Button,
    Menu,
    MenuItem,
    Tooltip,
    useMediaQuery,
    useTheme,
    Autocomplete,
    ListItemText,
    ListItemIcon,
    Divider,
    ButtonGroup,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import {
    AiOutlineCheckCircle,
    AiFillCheckCircle,
    AiOutlinePlus,
    AiOutlineDelete,
} from 'react-icons/ai';
import { PiCaretLeftThin, PiCaretRightThin } from 'react-icons/pi';
import { IMenuItem, IMenuList } from '@src/interfaces/common';
import { IUnit, UnitSections } from './interfaces';

interface BattleUnitsModalProps {
    open: boolean;
    onClose: () => void;
    menuList: IMenuList[];
    selectedUnits: IUnit[];
    setSelectedUnits: (units: IUnit[]) => void;
}

export const BattleUnitsModal: React.FC<BattleUnitsModalProps> = ({
    open,
    onClose,
    menuList,
    selectedUnits,
    setSelectedUnits,
}) => {
    const theme = useTheme();
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
    const [customUnitName, setCustomUnitName] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const generateUniqueId = (name: string) =>
        `${name}-${Math.random().toString(36).slice(2, 9)}`;

    const handleUnitSelectionChange =
        (section: UnitSections) =>
        (_: React.ChangeEvent<object>, newValue: IMenuItem[]) => {
            const newSelectedUnits = [
                ...selectedUnits.filter((item) => item.section !== section),
                ...newValue.map((item) => ({
                    ...item,
                    section,
                    parentId: item.id,
                    initiative: '',
                    maxHealth: '',
                    health: '',
                    armor: '',
                    isInBattle: null,
                    isCurrentMove: false,
                })),
            ];

            setSelectedUnits(newSelectedUnits);
        };

    const isSelected = (unit: IUnit) => {
        return selectedUnits.some(
            (selectedUnit) =>
                selectedUnit.id === unit.id &&
                selectedUnit.section === unit.section
        );
    };

    const handleAddCustomUnit = () => {
        if (!customUnitName) return;

        const newUnit: IUnit = {
            id: generateUniqueId(customUnitName),
            name: customUnitName,
            section: UnitSections.custom,
            parentId: '',
            initiative: '',
            maxHealth: '',
            health: '',
            armor: '',
            isInBattle: null,
            isCurrentMove: false,
        };

        setSelectedUnits([...selectedUnits, newUnit]);
        setCustomUnitName('');
    };

    const handleAddBestiaryUnit = (item: IMenuItem) => {
        const existingUnits = selectedUnits.filter((unit) =>
            unit.name.startsWith(item.name)
        );
        const newUnitName =
            existingUnits.length > 0
                ? `${item.name} - ${existingUnits.length + 1}`
                : item.name;

        const newUnit: IUnit = {
            id: generateUniqueId(item.id),
            name: newUnitName,
            section: UnitSections.bestiary,
            parentId: item.id,
            initiative: '',
            maxHealth: '',
            health: '',
            armor: '',
            isInBattle: null,
            isCurrentMove: false,
        };

        setSelectedUnits([...selectedUnits, newUnit]);
    };

    const handleRemoveBestiaryUnit = (unitId: string) => {
        const newSelectedUnits = [...selectedUnits];
        let index = -1;

        for (let i = newSelectedUnits.length - 1; i >= 0; i--) {
            if (
                newSelectedUnits[i].parentId === unitId &&
                newSelectedUnits[i].section === UnitSections.bestiary
            ) {
                index = i;
                break;
            }
        }

        if (index > -1) {
            newSelectedUnits.splice(index, 1);
            setSelectedUnits(newSelectedUnits);
        }
    };

    const handleRemoveAllBestiaryUnits = (unitId: string) => {
        setSelectedUnits(
            selectedUnits.filter(
                (unit) =>
                    !(
                        unit.parentId === unitId &&
                        unit.section === UnitSections.bestiary
                    )
            )
        );
    };

    const handleRemoveAllBestiary = () => {
        setSelectedUnits(
            selectedUnits.filter(
                (unit) => unit.section !== UnitSections.bestiary
            )
        );
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const getBestiaryUnitCount = (unitId: string) => {
        return selectedUnits.filter(
            (unit) =>
                unit.parentId === unitId &&
                unit.section === UnitSections.bestiary
        ).length;
    };

    const addCharacter = (
        <IconButton
            color="primary"
            onClick={handleAddCustomUnit}
            disabled={!customUnitName}
        >
            <AiOutlinePlus />
        </IconButton>
    );

    const renderedSections = [
        UnitSections.players,
        UnitSections.characters,
        UnitSections.bestiary,
    ].map((section) => {
        const sectionMenu = menuList.find((menu) => menu.section === section);
        if (!sectionMenu || !sectionMenu.content.length) return null;

        const sectionTitle = sectionMenu.title;

        if (section === UnitSections.bestiary) {
            return (
                <Box key={section}>
                    <ButtonGroup fullWidth>
                        <Button
                            color="inherit"
                            variant="outlined"
                            onClick={handleMenuOpen}
                            sx={{ flexGrow: 1, padding: '10px 14px' }}
                        >
                            Бестиарий
                        </Button>
                        <Tooltip title="Очистить бестиарий">
                            <Button
                                color="inherit"
                                variant="outlined"
                                onClick={handleRemoveAllBestiary}
                                sx={{ maxWidth: 50, padding: '10px 14px' }}
                            >
                                <AiOutlineDelete />
                            </Button>
                        </Tooltip>
                    </ButtonGroup>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        sx={{ maxHeight: 300 }}
                    >
                        {sectionMenu.content.map((item) => (
                            <MenuItem key={item.id}>
                                <ListItemIcon
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <IconButton
                                        onClick={() =>
                                            handleRemoveBestiaryUnit(item.id)
                                        }
                                    >
                                        <PiCaretLeftThin />
                                    </IconButton>
                                    <Typography>
                                        {getBestiaryUnitCount(item.id)}
                                    </Typography>
                                    <IconButton
                                        onClick={() =>
                                            handleAddBestiaryUnit(item)
                                        }
                                    >
                                        <PiCaretRightThin />
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemText sx={{ pr: 2 }}>
                                    {item.name}
                                </ListItemText>
                                <ListItemIcon>
                                    <Tooltip
                                        title="Удалить всех"
                                        placement="left"
                                    >
                                        <IconButton
                                            size="small"
                                            onClick={() =>
                                                handleRemoveAllBestiaryUnits(
                                                    item.id
                                                )
                                            }
                                        >
                                            <AiOutlineDelete />
                                        </IconButton>
                                    </Tooltip>
                                </ListItemIcon>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            );
        }

        return (
            <Autocomplete
                key={section}
                multiple
                disableCloseOnSelect
                options={sectionMenu.content}
                getOptionLabel={(option) => option.name}
                value={selectedUnits.filter((unit) => unit.section === section)}
                onChange={handleUnitSelectionChange(section)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={sectionTitle}
                        variant="outlined"
                    />
                )}
                renderOption={(props, option) => {
                    const unit: IUnit = {
                        ...option,
                        section,
                        parentId: option.id,
                        initiative: '',
                        maxHealth: '',
                        health: '',
                        armor: '',
                        isInBattle: null,
                        isCurrentMove: false,
                    };

                    return (
                        <li {...props}>
                            {isSelected(unit) ? (
                                <AiFillCheckCircle style={{ marginRight: 8 }} />
                            ) : (
                                <AiOutlineCheckCircle
                                    style={{ marginRight: 8 }}
                                />
                            )}
                            <Typography>{option.name}</Typography>
                        </li>
                    );
                }}
            />
        );
    });

    const hasNoResults = renderedSections.every((section) => section === null);

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                gap={4}
                p={2}
            >
                <Typography>Участники битвы</Typography>
                <IconButton size="small" onClick={onClose}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent>
                <Box>
                    <Typography variant="h6">
                        Создать нового персонажа
                    </Typography>
                    <Stack
                        direction={isSmUp ? 'row' : 'column'}
                        spacing={2}
                        pt={2}
                    >
                        <TextField
                            sx={{ width: isSmUp ? '50%' : '100%' }}
                            label="Имя персонажа"
                            value={customUnitName}
                            onChange={(e) => setCustomUnitName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleAddCustomUnit();
                            }}
                            variant="outlined"
                            InputProps={{ endAdornment: addCharacter }}
                        />
                        <Autocomplete
                            sx={{ width: isSmUp ? '50%' : '100%' }}
                            multiple
                            disableCloseOnSelect
                            options={selectedUnits.filter(
                                (unit) => unit.section === UnitSections.custom
                            )}
                            getOptionLabel={(option) => option.name}
                            value={selectedUnits.filter(
                                (unit) => unit.section === UnitSections.custom
                            )}
                            onChange={handleUnitSelectionChange(
                                UnitSections.custom
                            )}
                            isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Созданные персонажи"
                                    variant="outlined"
                                />
                            )}
                            renderOption={(props, option) => {
                                const unit: IUnit = {
                                    ...option,
                                    section: UnitSections.custom,
                                };

                                return (
                                    <li {...props}>
                                        {isSelected(unit) ? (
                                            <AiFillCheckCircle
                                                style={{ marginRight: 8 }}
                                            />
                                        ) : (
                                            <AiOutlineCheckCircle
                                                style={{ marginRight: 8 }}
                                            />
                                        )}
                                        <Typography>{option.name}</Typography>
                                    </li>
                                );
                            }}
                            fullWidth
                        />
                    </Stack>
                    <Typography variant="h6" pt={4}>
                        Выбрать из готовых
                    </Typography>
                    <Stack spacing={2} pt={2}>
                        {renderedSections}
                        {hasNoResults && (
                            <Typography
                                mt={2}
                                variant="body2"
                                color="text.secondary"
                            >
                                Ничего не найдено
                            </Typography>
                        )}
                    </Stack>
                </Box>
            </DialogContent>
        </Dialog>
    );
};
