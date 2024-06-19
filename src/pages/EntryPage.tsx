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

import backgroundImage from '@src/assets/bg.webp';
import { LockOutlined } from '@mui/icons-material';

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

export const EntryPage = () => {
    const { isAuthenticated, login } = useAuth();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

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

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: 'black',
            }}
        >
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
                    border: (theme) =>
                        `1px solid ${theme.palette.secondary.main}`,
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
        </Box>
    );
};
