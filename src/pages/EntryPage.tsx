import React from 'react';
import { useAuth } from '@src/providers/AuthProvider';
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert,
    alpha,
    styled,
    Avatar,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

import bg from '@src/assets/entryPage/bg.png';
import dices from '@src/assets/entryPage/dices.png';
import leaves from '@src/assets/entryPage/leaves.png';
import drops from '@src/assets/entryPage/drops.png';
import { RainEffect } from '@src/components/common/RainEffect';

type Rotation = {
    rotateX: number;
    rotateY: number;
};

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-input': { color: theme.palette.common.white },
    '& .MuiInputLabel-root': {
        color: alpha(theme.palette.common.white, 0.7),
        '&.Mui-focused': { color: theme.palette.secondary.main },
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: alpha(theme.palette.common.white, 0.7),
        },
        '&:hover fieldset': {
            borderColor: theme.palette.common.white,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.secondary.main,
        },
    },
}));

const StyledBox = styled(Box)(() => ({
    position: 'absolute',
    inset: '-2.5vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));

export const EntryPage = () => {
    const { isAuthenticated, login } = useAuth();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [rotation, setRotation] = React.useState<Rotation>({
        rotateX: 0,
        rotateY: 0,
    });

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY, currentTarget } = event;
        const { offsetWidth, offsetHeight } = currentTarget;
        const halfWidth = offsetWidth / 2;
        const halfHeight = offsetHeight / 2;
        const rotateY = ((clientX - halfWidth) / halfWidth) * -2;
        const rotateX = -((clientY - halfHeight) / halfHeight) * -4;

        setRotation({ rotateX, rotateY });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(username, password);

        if (isAuthenticated) {
            setError('');
        } else {
            setError('Неправильное имя пользователя или пароль');
        }
    };

    React.useEffect(() => {
        setError('');
    }, [username, password]);

    const form = (
        <Box
            sx={{
                maxWidth: 450,
                padding: 4,
                textAlign: 'center',
                borderRadius: 2,
                boxShadow: (theme) =>
                    `inset -5px 5px 10px 0px ${alpha(
                        theme.palette.secondary.main,
                        0.6
                    )}`,
                backdropFilter: 'blur(25px)',
                color: 'secondary.contrastText',
                border: (theme) => `1px solid ${theme.palette.secondary.main}`,
            }}
        >
            <Avatar
                sx={{
                    margin: 'auto',
                    backgroundColor: 'secondary.main',
                }}
            >
                <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h4" sx={{ mt: 2 }}>
                Введите учетные данные для входа
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <StyledTextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Имя пользователя"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <StyledTextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Пароль"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Войти
                </Button>
            </Box>
        </Box>
    );

    return (
        <Box
            onMouseMove={handleMouseMove}
            sx={{
                perspective: '1000px',
                overflow: 'hidden',
                bgcolor: 'common.black',
            }}
        >
            <Box
                sx={{
                    height: '100vh',
                    transformStyle: 'preserve-3d',
                    transform: `rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg)`,
                    willChange: 'transform',
                    transition: 'transform 0.1s ease-out',
                }}
            >
                <StyledBox
                    sx={{
                        backgroundImage: `url(${bg})`,
                        transform: 'translateZ(-50px) scale(1.10)',
                    }}
                ></StyledBox>
                <StyledBox
                    sx={{
                        backgroundImage: `url(${dices})`,
                        transform: 'translateZ(150px) scale(.9)',
                    }}
                >
                    {form}
                </StyledBox>
                <StyledBox
                    sx={{
                        transform: 'translateZ(175px) scale(1)',
                        pointerEvents: 'none',
                    }}
                >
                    <RainEffect />
                </StyledBox>
                <StyledBox
                    sx={{
                        backgroundImage: `url(${leaves})`,
                        transform: 'translateZ(200px) scale(.8)',
                        pointerEvents: 'none',
                    }}
                ></StyledBox>
                <StyledBox
                    sx={{
                        backgroundImage: `url(${drops})`,
                        transform: 'translateZ(220px) scale(.8)',
                        pointerEvents: 'none',
                    }}
                ></StyledBox>
            </Box>
        </Box>
    );
};
