import React from 'react';
import { useAuth } from '@src/providers/AuthProvider';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Alert,
} from '@mui/material';

export const EntryPage = () => {
    const { login } = useAuth();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (login(username, password)) {
            setError('');
        } else {
            setError('Неправильное имя пользователя или пароль');
        }
    };

    React.useEffect(() => {
        setError('');
    }, [username, password]);

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 8,
                }}
            >
                <Typography component="h1" variant="h5">
                    Введите учетные данные для входа
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ maxWidth: 400, mt: 1 }}
                >
                    <TextField
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
                    <TextField
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
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Войти
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};
