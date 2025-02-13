import React from 'react';
import { Container, Typography, Button, Box, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import Notifications from '../components/Notifications'; // Importa el componente de notificaciones

const Home: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ paddingTop: '20px' }}>
            {/* Notificaciones */}
            <Notifications /> {/* Aquí se muestra el componente de notificaciones */}

            {/* Título principal */}
            <Typography variant="h3" gutterBottom>
                Bienvenido a EduConnect
            </Typography>

            {/* Descripción de la aplicación */}
            <Typography variant="body1" paragraph>
                Conecta con estudiantes y docentes en un espacio único para compartir conocimientos y recursos.
            </Typography>

            {/* Divider para separar contenido */}
            <Divider sx={{ marginY: 2 }} />

            {/* Llamado a la acción */}
            <Typography variant="h6" paragraph>
                ¿Quieres explorar más? ¡Mira nuestras publicaciones!
            </Typography>

            {/* Botón que redirige a las publicaciones */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/posts"
                    sx={{ padding: '10px 20px', fontSize: '16px' }}
                >
                    Ver Publicaciones
                </Button>
            </Box>
        </Container>
    );
};

export default Home;
