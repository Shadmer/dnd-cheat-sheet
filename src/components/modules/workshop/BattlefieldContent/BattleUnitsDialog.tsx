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
} from '@mui/material';
import {
    AiOutlineCheckCircle,
    AiFillCheckCircle,
    AiOutlinePlus,
    AiOutlineDelete,
} from 'react-icons/ai';
import { PiCaretLeftThin, PiCaretRightThin } from 'react-icons/pi';
import { IMenuItem, IMenuList } from '@src/interfaces/common';
import { IUnit } from './interfaces';
import { Close } from '@mui/icons-material';

interface BattleUnitsDialogProps {
    open: boolean;
    onClose: () => void;
    menuList: IMenuList[];
    selectedUnits: IUnit[];
    setSelectedUnits: (units: IUnit[]) => void;
}

export const BattleUnitsDialog: React.FC<BattleUnitsDialogProps> = ({
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
        (section: string) =>
        (_: React.ChangeEvent<object>, newValue: IMenuItem[]) => {
            const newSelectedUnits = [
                ...selectedUnits.filter((item) => item.section !== section),
                ...newValue.map((item) => ({
                    ...item,
                    section,
                    url: `${section}/card/${item.id}`,
                    initiative: '',
                    maxHealth: '',
                    health: '',
                    armor: '',
                    speed: '',
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
            section: 'custom',
            url: '',
            initiative: '',
            maxHealth: '',
            health: '',
            armor: '',
            speed: '',
        };

        setSelectedUnits([...selectedUnits, newUnit]);
        setCustomUnitName('');
    };

    const handleAddBestiaryUnit = (item: IMenuItem) => {
        const newUnit: IUnit = {
            id: generateUniqueId(item.id),
            name: item.name,
            section: 'bestiary',
            url: `bestiary/card/${item.id}`,
            initiative: '',
            maxHealth: '',
            health: '',
            armor: '',
            speed: '',
        };

        setSelectedUnits([...selectedUnits, newUnit]);
    };

    const handleRemoveBestiaryUnit = (name: string) => {
        const newSelectedUnits = [...selectedUnits];
        const index = newSelectedUnits.findIndex(
            (unit) => unit.name === name && unit.section === 'bestiary'
        );
        if (index > -1) {
            newSelectedUnits.splice(index, 1);
            setSelectedUnits(newSelectedUnits);
        }
    };

    const handleRemoveAllBestiaryUnits = (name: string) => {
        setSelectedUnits(
            selectedUnits.filter(
                (unit) => !(unit.name === name && unit.section === 'bestiary')
            )
        );
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const getBestiaryUnitCount = (name: string) => {
        return selectedUnits.filter(
            (unit) => unit.name === name && unit.section === 'bestiary'
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
                            InputProps={{
                                endAdornment: addCharacter,
                            }}
                        />
                        <Autocomplete
                            sx={{ width: isSmUp ? '50%' : '100%' }}
                            multiple
                            disableCloseOnSelect
                            options={selectedUnits.filter(
                                (unit) => unit.section === 'custom'
                            )}
                            getOptionLabel={(option) => option.name}
                            value={selectedUnits.filter(
                                (unit) => unit.section === 'custom'
                            )}
                            onChange={handleUnitSelectionChange('custom')}
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
                                    section: 'custom',
                                };

                                return (
                                    <li {...props}>
                                        {isSelected(unit) ? (
                                            <AiFillCheckCircle
                                                style={{
                                                    marginRight: 8,
                                                }}
                                            />
                                        ) : (
                                            <AiOutlineCheckCircle
                                                style={{
                                                    marginRight: 8,
                                                }}
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
                        {['players', 'characters', 'bestiary'].map(
                            (section) => {
                                const sectionMenu = menuList.find(
                                    (menu) => menu.section === section
                                );
                                if (!sectionMenu) return null;

                                const sectionTitle = sectionMenu.title;

                                if (section === 'bestiary') {
                                    return (
                                        <Box key={section}>
                                            <Button
                                                color="inherit"
                                                variant="outlined"
                                                onClick={handleMenuOpen}
                                                fullWidth
                                                sx={{
                                                    padding: '10px 14px',
                                                }}
                                            >
                                                Бестиарий
                                            </Button>
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={handleMenuClose}
                                            >
                                                {sectionMenu.content.map(
                                                    (item) => (
                                                        <MenuItem key={item.id}>
                                                            <ListItemIcon
                                                                sx={{
                                                                    display:
                                                                        'flex',
                                                                    alignItems:
                                                                        'center',
                                                                }}
                                                            >
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() =>
                                                                        handleRemoveBestiaryUnit(
                                                                            item.name
                                                                        )
                                                                    }
                                                                >
                                                                    <PiCaretLeftThin />
                                                                </IconButton>
                                                                <Typography>
                                                                    {getBestiaryUnitCount(
                                                                        item.name
                                                                    )}
                                                                </Typography>
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() =>
                                                                        handleAddBestiaryUnit(
                                                                            item
                                                                        )
                                                                    }
                                                                >
                                                                    <PiCaretRightThin />
                                                                </IconButton>
                                                            </ListItemIcon>
                                                            <ListItemText
                                                                sx={{ pr: 2 }}
                                                            >
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
                                                                                item.name
                                                                            )
                                                                        }
                                                                    >
                                                                        <AiOutlineDelete />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </ListItemIcon>
                                                        </MenuItem>
                                                    )
                                                )}
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
                                        value={selectedUnits.filter(
                                            (unit) => unit.section === section
                                        )}
                                        onChange={handleUnitSelectionChange(
                                            section
                                        )}
                                        isOptionEqualToValue={(option, value) =>
                                            option.id === value.id
                                        }
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
                                                url: `${section}/card/${option.id}`,
                                                initiative: '',
                                                maxHealth: '',
                                                health: '',
                                                armor: '',
                                                speed: '',
                                            };

                                            return (
                                                <li {...props}>
                                                    {isSelected(unit) ? (
                                                        <AiFillCheckCircle
                                                            style={{
                                                                marginRight: 8,
                                                            }}
                                                        />
                                                    ) : (
                                                        <AiOutlineCheckCircle
                                                            style={{
                                                                marginRight: 8,
                                                            }}
                                                        />
                                                    )}
                                                    <Typography>
                                                        {option.name}
                                                    </Typography>
                                                </li>
                                            );
                                        }}
                                    />
                                );
                            }
                        )}
                    </Stack>
                </Box>
            </DialogContent>
        </Dialog>
    );
};
