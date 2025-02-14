import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, CircularProgress, Modal } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);  // Para mostrar el cargando
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Para abrir el modal en caso de error
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);  // Activar estado de carga

        // Validaciones simples
        if (!email || !password) {
            setError('Todos los campos son obligatorios.');
            setIsLoading(false);  // Desactivar estado de carga
            setIsModalOpen(true); // Abrir modal de error
            return;
        }

        // Validación de formato del correo electrónico
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            setError('Por favor, ingresa un correo electrónico válido.');
            setIsLoading(false);
            setIsModalOpen(true); // Abrir modal de error
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
            setIsModalOpen(true); // Abrir modal de error
        }

        setIsLoading(false);  // Desactivar estado de carga
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ marginTop: 8, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Iniciar Sesión
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Correo electrónico"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}  // Deshabilitar campos mientras se valida
                    />
                    <TextField
                        label="Contraseña"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        sx={{ marginTop: 2 }}
                        disabled={isLoading}  // Deshabilitar el botón mientras se valida
                    >
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Iniciar Sesión'}
                    </Button>
                </form>
                <Typography sx={{ marginTop: 2 }}>
                    ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>.
                </Typography>
            </Box>

            {/* Modal de error */}
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#f1f1f1',  // Fondo claro y suave
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: 24,
                        width: 400,
                    }}
                >
                    <Typography id="modal-title" variant="h6" sx={{ marginBottom: 2 }}>
                        Error de inicio de sesión
                    </Typography>
                    <Typography id="modal-description" sx={{ marginBottom: 2 }}>
                        {error}
                    </Typography>
                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={() => setIsModalOpen(false)}
                    >
                        Cerrar
                    </Button>
                </Box>
            </Modal>
        </Container>
    );
};

export default Login;
