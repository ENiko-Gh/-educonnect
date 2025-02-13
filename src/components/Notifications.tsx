// src/components/Notifications.tsx

import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';

const Notifications: React.FC = () => {
    const [notification, setNotification] = useState<string>('');

    useEffect(() => {
        // Simula una notificación
        const timer = setTimeout(() => {
            setNotification('Tienes nuevas publicaciones en el foro');
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {notification && <div style={{ backgroundColor: 'lightblue', padding: '10px' }}>{notification}</div>}
            <Button onClick={() => setNotification('Tienes un nuevo mensaje!')}>Mostrar Notificación</Button>
        </div>
    );
};

export default Notifications;
