import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Notifications: React.FC = () => {
    const [notifications, setNotifications] = useState<string[]>([]);
    const navigate = useNavigate(); // Hook para redireccionar

    useEffect(() => {
        // Simula la llegada automática de una notificación después de 2 segundos
        const timer = setTimeout(() => {
            setNotifications((prev) => [...prev, 'Tienes nuevas publicaciones en el foro']);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    // Función para agregar notificaciones y redirigir
    const handleNotificationClick = () => {
        const nuevosMensajes = [
            'Nuevo comentario en tu publicación',
            'Un usuario respondió tu mensaje',
            'Tienes una nueva solicitud de amistad'
        ];
        const mensajeAleatorio = nuevosMensajes[Math.floor(Math.random() * nuevosMensajes.length)];
        setNotifications((prev) => [...prev, mensajeAleatorio]);

        // Redirige a la página de notificaciones
        navigate('/notificaciones')
    };

    // Función para limpiar las notificaciones
    const clearNotifications = () => {
        setNotifications([]);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px' }}>
            {notifications.length > 0 && (
                <div style={{ backgroundColor: 'lightblue', padding: '10px', marginBottom: '10px' }}>
                    {`Tienes ${notifications.length} ${notifications.length > 1 ? 'mensajes' : 'mensaje'} nuevo${notifications.length > 1 ? 's' : ''}`}
                    <ul>
                        {notifications.map((msg, index) => (
                            <li key={index}>{msg}</li>
                        ))}
                    </ul>
                </div>
            )}
            <Button variant="contained" color="primary" onClick={handleNotificationClick} style={{ marginRight: '10px' }}>
                Mostrar Notificación
            </Button>
            <Button variant="contained" color="secondary" onClick={clearNotifications} disabled={notifications.length === 0}>
                Limpiar Notificaciones
            </Button>
        </div>
    );
};

export default Notifications;
;