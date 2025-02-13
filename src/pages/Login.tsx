import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validaciones simples
        if (!email || !password) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        // Validación de formato del correo electrónico
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            setError('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        // Obtener usuarios de localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: { email: string; password: string }) => u.email === email && u.password === password);

        if (user) {
            // Guardar el usuario en localStorage (persistente a través de recargas)
            localStorage.setItem('currentUser', JSON.stringify(user));

            // Redirigir según el rol
            if (user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/posts');
            }
        } else {
            setError('Correo electrónico o contraseña incorrectos.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ marginTop: 8, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Iniciar Sesión
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Correo electrónico"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Contraseña"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        sx={{ marginTop: 2 }}
                    >
                        Iniciar Sesión
                    </Button>
                </form>
                <Typography sx={{ marginTop: 2 }}>
                    ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>.
                </Typography>
            </Box>
        </Container>
    );
};

export default Login;
