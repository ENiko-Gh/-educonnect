import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, List, ListItem, ListItemText, ListItemIcon, Typography, Container } from '@mui/material';
import { Notifications, CheckCircle, Warning, Info, Home } from '@mui/icons-material';

const NotificacionesPage: React.FC = () => {
    const navigate = useNavigate();
    const [notificaciones, setNotificaciones] = useState<string[]>([]);

    useEffect(() => {
        // Simulación de carga de notificaciones desde una API o localStorage
        setNotificaciones([
            "Tienes una nueva publicación en el foro.",
            "Tu solicitud de amistad ha sido aceptada.",
            "Recibiste un nuevo mensaje en el chat.",
            "Actualización: Nueva versión de la plataforma disponible.",
            "Recordatorio: Tienes una reunión programada para mañana.",
            "Tu suscripción está por vencer en 3 días.",
            "Has sido mencionado en una publicación.",
            "Nuevo comentario en tu publicación.",
            "Error detectado en tu última tarea enviada.",
            "Tu perfil ha sido actualizado correctamente."
        ]);
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>📢 Notificaciones</Typography>
            <List>
                {notificaciones.map((noti, index) => (
                    <ListItem key={index}>
                        <ListItemIcon>
                            {index % 3 === 0 ? <Notifications color="primary" /> :
                                index % 3 === 1 ? <CheckCircle color="success" /> :
                                    index % 3 === 2 ? <Warning color="error" /> : <Info color="secondary" />}
                        </ListItemIcon>
                        <ListItemText primary={noti} />
                    </ListItem>
                ))}
            </List>

            {/* Botón para volver al inicio */}
            <Button
                variant="contained"
                color="primary"
                startIcon={<Home />}
                onClick={() => navigate('/')}
                sx={{ mt: 2 }}
            >
                Volver al Inicio
            </Button>
        </Container>
    );
};

export default NotificacionesPage;
