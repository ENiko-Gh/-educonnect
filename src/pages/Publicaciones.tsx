// src/pages/Publicaciones.tsx
import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Button, TextField, Card, CardContent, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Definir la interfaz para las publicaciones
interface Publicacion {
    id: number;
    nombreUsuario: string;
    tema: string;
    texto: string;
    fecha: string;
}

const Publicaciones: React.FC = () => {
    const navigate = useNavigate();
    const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
    const [nuevoPost, setNuevoPost] = useState<string>('');
    const [nombreUsuario, setNombreUsuario] = useState<string>('');
    const [tema, setTema] = useState<string>('');

    // Cargar publicaciones desde localStorage
    useEffect(() => {
        const publicacionesGuardadas = JSON.parse(localStorage.getItem('publicaciones') || '[]');
        setPublicaciones(publicacionesGuardadas);
    }, []);

    // Agregar nueva publicación
    const agregarPublicacion = () => {
        if (nombreUsuario.trim() !== '' && tema.trim() !== '' && nuevoPost.trim() !== '') {
            const nuevaPublicacion: Publicacion = {
                id: Date.now(),
                nombreUsuario,
                tema,
                texto: nuevoPost,
                fecha: new Date().toLocaleString(),
            };
            const nuevasPublicaciones = [...publicaciones, nuevaPublicacion];
            setPublicaciones(nuevasPublicaciones);
            localStorage.setItem('publicaciones', JSON.stringify(nuevasPublicaciones));
            setNuevoPost('');
            setNombreUsuario('');
            setTema('');
        }
    };

    // Eliminar publicación
    const eliminarPublicacion = (id: number) => {
        const publicacionesFiltradas = publicaciones.filter(pub => pub.id !== id);
        setPublicaciones(publicacionesFiltradas);
        localStorage.setItem('publicaciones', JSON.stringify(publicacionesFiltradas));
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Publicaciones
            </Typography>

            {/* Formulario para agregar una publicación */}
            <TextField
                label="Nombre de Usuario"
                variant="outlined"
                fullWidth
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                style={{ marginBottom: '10px' }}
            />
            <TextField
                label="Tema"
                variant="outlined"
                fullWidth
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                style={{ marginBottom: '10px' }}
            />
            <TextField
                label="Escribe una nueva publicación"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={nuevoPost}
                onChange={(e) => setNuevoPost(e.target.value)}
                placeholder="Escribe algo interesante..."
            />
            <Button
                onClick={agregarPublicacion}
                variant="contained"
                color="primary"
                style={{ marginTop: '10px' }}
                disabled={nuevoPost.trim() === '' || nombreUsuario.trim() === '' || tema.trim() === ''}
            >
                Agregar Publicación
            </Button>

            {/* Mostrar publicaciones existentes */}
            <Grid container spacing={2} style={{ marginTop: '20px' }}>
                {publicaciones.map((pub) => (
                    <Grid item xs={12} key={pub.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{pub.tema}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Por {pub.nombreUsuario} - {pub.fecha}
                                </Typography>
                                <Typography variant="body1" sx={{ marginTop: 2 }}>
                                    {pub.texto}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => eliminarPublicacion(pub.id)}
                                    style={{ marginTop: '10px' }}
                                >
                                    Eliminar
                                </Button>
                            </CardContent>
                            <Divider />
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Botón para administrar publicaciones */}
            <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate('/admin-actions', { state: { publicaciones } })}
                style={{ marginTop: '20px' }}
            >
                Administrar Publicaciones
            </Button>
        </Container>
    );
};

export default Publicaciones;
