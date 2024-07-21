import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Typography,
    Box,
    Stack,
    Tooltip,
    Grid,
    Card,
    CardContent,
    CardActionArea,
    Button,
    Divider,
} from '@mui/material';
import { GiBleedingEye } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { IUnit } from './interfaces';

interface InitiativeUnitsModalProps {
    open: boolean;
    onClose: () => void;
    selectedUnits: IUnit[];
    setSelectedUnits: React.Dispatch<React.SetStateAction<IUnit[]>>;
}

export const InitiativeUnitsModal: React.FC<InitiativeUnitsModalProps> = ({
    open,
    onClose,
    selectedUnits,
    setSelectedUnits,
}) => {
    const inBattleUnits = selectedUnits.filter((unit) => unit.isInBattle);
    const sortedUnits = React.useMemo(() => {
        return [...inBattleUnits].sort(
            (a, b) => parseInt(b.initiative) - parseInt(a.initiative)
        );
    }, [inBattleUnits]);

    const isWounded = (unit: IUnit) => parseInt(unit.health) === 0;

    const [currentMoveUnit, setCurrentMoveUnit] = React.useState<IUnit | null>(
        sortedUnits.find((unit) => unit.isCurrentMove) || sortedUnits[0] || null
    );

    const handleNextMove = () => {
        if (currentMoveUnit) {
            const currentIndex = sortedUnits.findIndex(
                (unit) => unit.id === currentMoveUnit.id
            );
            const nextUnit =
                sortedUnits[(currentIndex + 1) % sortedUnits.length] || null;

            setSelectedUnits((units) =>
                units.map((unit) => ({
                    ...unit,
                    isCurrentMove: unit.id === nextUnit?.id,
                }))
            );
            setCurrentMoveUnit(nextUnit);
        }
    };

    const handleSetCurrentMove = (id: string) => {
        setSelectedUnits((units) =>
            units.map((unit) => ({
                ...unit,
                isCurrentMove: unit.id === id,
            }))
        );
        setCurrentMoveUnit(sortedUnits.find((unit) => unit.id === id) || null);
    };

    React.useEffect(() => {
        if (sortedUnits.length) {
            const initialMoveUnit =
                sortedUnits.find((unit) => unit.isCurrentMove) ||
                sortedUnits[0] ||
                null;
            setCurrentMoveUnit(initialMoveUnit);
            setSelectedUnits((units) =>
                units.map((unit) => ({
                    ...unit,
                    isCurrentMove: unit.id === initialMoveUnit?.id,
                }))
            );
        } else {
            setCurrentMoveUnit(null);
        }
    }, [selectedUnits, setSelectedUnits, sortedUnits]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography variant="h4">Очередь Ходов</Typography>
                    <IconButton onClick={onClose}>
                        <AiOutlineClose />
                    </IconButton>
                </Stack>
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    {sortedUnits.map((unit) => (
                        <Grid item xs={12} sm={6} key={unit.id}>
                            <Card
                                raised={unit.isCurrentMove}
                                sx={{
                                    border: unit.isCurrentMove ? 2 : 'none',
                                    boxShadow: (theme) =>
                                        isWounded(unit)
                                            ? `inset 0px 0px 15px 0px ${theme.palette.error.main}`
                                            : 'auto',
                                }}
                            >
                                <CardActionArea
                                    onClick={() =>
                                        handleSetCurrentMove(unit.id)
                                    }
                                >
                                    <CardContent>
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            spacing={2}
                                        >
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                            >
                                                <GiBleedingEye size={20} />
                                                <Typography
                                                    variant="body1"
                                                    ml={1}
                                                >
                                                    {unit.initiative}
                                                </Typography>
                                            </Box>
                                            <Divider
                                                orientation="vertical"
                                                flexItem
                                            />
                                            <Tooltip title={unit.name}>
                                                <Typography
                                                    variant="body1"
                                                    noWrap
                                                    sx={{
                                                        textOverflow:
                                                            'ellipsis',
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    {unit.name}
                                                </Typography>
                                            </Tooltip>
                                        </Stack>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleNextMove}
                    variant="outlined"
                    color="inherit"
                >
                    Переход хода
                </Button>
            </DialogActions>
        </Dialog>
    );
};
