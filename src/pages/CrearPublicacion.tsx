// src/pages/CrearPublicacion.tsx
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

const CrearPublicacion: React.FC = () => {
    const [nombreUsuario, setNombreUsuario] = useState<string>('');
    const [tema, setTema] = useState<string>('');
    const [texto, setTexto] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validación de campos
        if (!nombreUsuario || !tema || !texto) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        // Obtener publicaciones existentes o crear un array vacío
        const publicaciones = JSON.parse(localStorage.getItem('publicaciones') || '[]');

        // Crear nueva publicación
        const nuevaPublicacion = {
            nombreUsuario,
            tema,
            texto,
            fecha: new Date().toLocaleString(),
        };

        // Guardar la nueva publicación en localStorage
        publicaciones.push(nuevaPublicacion);
        localStorage.setItem('publicaciones', JSON.stringify(publicaciones));

        // Limpiar campos
        setNombreUsuario('');
        setTema('');
        setTexto('');
        setError('');
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ marginTop: 8, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Crear Publicación
                </Typography>
                {error && <Typography color="error" sx={{ marginBottom: 2 }}>{error}</Typography>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nombre de Usuario"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={nombreUsuario}
                        onChange={(e) => setNombreUsuario(e.target.value)}
                    />
                    <TextField
                        label="Tema"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={tema}
                        onChange={(e) => setTema(e.target.value)}
                    />
                    <TextField
                        label="Texto"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                        multiline
                        rows={4}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 2 }}
                    >
                        Crear Publicación
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default CrearPublicacion;
