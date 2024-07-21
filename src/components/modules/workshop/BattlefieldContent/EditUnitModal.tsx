import React, { ChangeEvent } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControlLabel,
    Switch,
} from '@mui/material';
import { IUnit, UnitSections } from './interfaces';

interface EditUnitModalProps {
    unit: IUnit | null;
    open: boolean;
    onClose: () => void;
    handleEditChange: (editedUnit: IUnit) => void;
}

export const EditUnitModal: React.FC<EditUnitModalProps> = ({
    unit,
    open,
    onClose,
    handleEditChange,
}) => {
    const [editedUnit, setEditedUnit] = React.useState<IUnit>(
        unit || {
            id: '',
            name: '',
            initiative: '',
            armor: '',
            health: '',
            maxHealth: '',
            isInBattle: null,
            section: UnitSections.custom,
            parentId: '',
            isCurrentMove: false,
        }
    );

    React.useEffect(() => {
        if (unit) {
            setEditedUnit(unit);
        }
    }, [unit]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedUnit({ ...editedUnit, [name]: value });
    };

    const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEditedUnit({ ...editedUnit, isInBattle: e.target.checked });
    };

    const handleSave = () => {
        handleEditChange(editedUnit);
        onClose();
    };

    const isReadyForBattle =
        editedUnit.initiative !== '' &&
        editedUnit.armor !== '' &&
        editedUnit.health !== '' &&
        editedUnit.maxHealth !== '';

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Редактировать персонажа</DialogTitle>
            <DialogContent>
                <TextField
                    label="Имя"
                    name="name"
                    value={editedUnit.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Инициатива"
                    name="initiative"
                    type="number"
                    value={editedUnit.initiative}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Броня"
                    name="armor"
                    type="number"
                    value={editedUnit.armor}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Текущее здоровье"
                    name="health"
                    type="number"
                    value={editedUnit.health}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Максимальное здоровье"
                    name="maxHealth"
                    type="number"
                    value={editedUnit.maxHealth}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={!!editedUnit.isInBattle}
                            onChange={handleSwitchChange}
                            name="isInBattle"
                            color="primary"
                            disabled={!isReadyForBattle}
                        />
                    }
                    label="В бою"
                />
            </DialogContent>
            <DialogActions>
                <Button variant="text" color="inherit" onClick={handleSave}>
                    Сохранить
                </Button>
                <Button variant="outlined" color="inherit" onClick={onClose}>
                    Отмена
                </Button>
            </DialogActions>
        </Dialog>
    );
};
