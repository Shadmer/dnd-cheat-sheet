import React from 'react';
import {
    IconButton,
    Tooltip,
    Card,
    CardContent,
    CardActions,
    TextField,
    Typography,
    Stack,
    LinearProgress,
} from '@mui/material';
import {
    GiArmorUpgrade,
    GiDrippingSword,
    GiHealthPotion,
    GiInfo,
    GiBleedingEye,
    GiHalfHeart,
    Gi3dHammer,
} from 'react-icons/gi';
import { IUnit } from './interfaces';

interface UnitCardProps {
    unit: IUnit;
    handleUnitClick: (unit: IUnit) => void;
    handleDamage: (id: string, amount: number) => void;
    handleHeal: (id: string, amount: number) => void;
    openEditModal: (unit: IUnit) => void;
}

export const UnitCard: React.FC<UnitCardProps> = ({
    unit,
    handleUnitClick,
    handleDamage,
    handleHeal,
    openEditModal,
}) => {
    const [amount, setAmount] = React.useState<number>(0);
    const isInBattle = unit.isInBattle;
    const isWounded = parseInt(unit.health) === 0;
    const healthIsNumber = !isNaN(parseInt(unit.health));

    return (
        <Card
            sx={{
                position: 'relative',
                border: '1px solid',
                backgroundColor: 'background.paper',
                opacity: isInBattle ? 1 : 0.3,
                boxShadow: (theme) =>
                    isWounded
                        ? `inset 0px 0px 30px 0px ${theme.palette.error.main}`
                        : 'none',
                '&:hover': !isWounded
                    ? {
                          boxShadow: (theme) =>
                              `5px 5px 10px 0px ${theme.palette.primary.main}`,
                      }
                    : 'none',
            }}
        >
            <CardContent>
                <LinearProgress
                    variant="determinate"
                    value={Math.min(
                        (parseInt(unit.health) / parseInt(unit.maxHealth)) *
                            100,
                        100
                    )}
                    sx={{
                        height: 10,
                        borderRadius: 5,
                        mb: 1,
                        bgcolor: 'error.main',
                    }}
                />
                <Stack direction="row" alignItems="justify" spacing={2} mb={1}>
                    <Tooltip title="Инициатива">
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <GiBleedingEye />
                            <Typography color="textSecondary">
                                {unit.initiative || 0}
                            </Typography>
                        </Stack>
                    </Tooltip>
                    <Tooltip title="Броня">
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <GiArmorUpgrade />
                            <Typography color="textSecondary">
                                {unit.armor || 0}
                            </Typography>
                        </Stack>
                    </Tooltip>
                    <Tooltip title="Здоровье">
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <GiHalfHeart />
                            <Typography color="textSecondary">
                                {unit.health || 0} / {unit.maxHealth || 0}
                            </Typography>
                        </Stack>
                    </Tooltip>
                </Stack>
                <Tooltip title={unit.name}>
                    <Typography variant="h4" fontWeight="bold" noWrap>
                        {unit.name}
                    </Typography>
                </Tooltip>
            </CardContent>
            <CardActions>
                <TextField
                    variant="outlined"
                    type="number"
                    label="Урон / Лечение"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    size="small"
                    sx={{ mr: 1 }}
                    InputProps={{
                        endAdornment: (
                            <>
                                <Tooltip title="Полечить">
                                    <span>
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                handleHeal(unit.id, amount);
                                                setAmount(0);
                                            }}
                                            disabled={!healthIsNumber}
                                        >
                                            <GiHealthPotion />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                                <Tooltip title="Нанести урон">
                                    <span>
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                handleDamage(unit.id, amount);
                                                setAmount(0);
                                            }}
                                            disabled={!healthIsNumber}
                                        >
                                            <GiDrippingSword />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </>
                        ),
                    }}
                    disabled={!healthIsNumber}
                />

                <Tooltip title="Информация">
                    <IconButton
                        size="small"
                        onClick={() => handleUnitClick(unit)}
                    >
                        <GiInfo />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Редактировать">
                    <IconButton
                        size="small"
                        onClick={() => openEditModal(unit)}
                    >
                        <Gi3dHammer />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    );
};
