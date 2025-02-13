import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validaciones simples
        if (!name || !email || !password) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        // Validación del formato del correo electrónico
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            setError('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        // Verificar si el correo ya está registrado
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = users.some((user: { email: string }) => user.email === email);
        if (userExists) {
            setError('El correo electrónico ya está registrado.');
            return;
        }

        // Crear el nuevo usuario
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
            role: 'publicador', // Rol por defecto
        };

        // Guardar usuario en localStorage
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Redirigir al login después del registro
        navigate('/login');
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ marginTop: 8, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Registro
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nombre"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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
                        Registrarse
                    </Button>
                </form>
                <Typography sx={{ marginTop: 2 }}>
                    ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>.
                </Typography>
            </Box>
        </Container>
    );
};

export default Register;
