import React from 'react';
import { IconButton, Tooltip, Box, Typography, Stack } from '@mui/material';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { useStores } from '@src/providers/RootStoreContext';
import { BattleUnitsDialog } from './BattleUnitsDialog';
import { IUnit } from './interfaces';

export const BattlefieldContent = () => {
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

    const handleUnitClick = (unit: IUnit) => {
        console.log('Selected Unit:', unit);
    };

    return (
        <Box>
            <Tooltip title="Выбрать участников битвы">
                <IconButton onClick={handleOpen}>
                    <AiOutlineAppstoreAdd size={24} />
                </IconButton>
            </Tooltip>
            <Stack spacing={2} mt={2}>
                {selectedUnits.map((unit) => (
                    <Box
                        key={unit.id}
                        sx={{
                            border: '1px solid #ccc',
                            borderRadius: 4,
                            padding: 2,
                            cursor: 'pointer',
                        }}
                        onClick={() => handleUnitClick(unit)}
                    >
                        <Typography>{unit.name}</Typography>
                    </Box>
                ))}
            </Stack>
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
