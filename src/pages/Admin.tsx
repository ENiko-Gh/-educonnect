import React from 'react';
import { Container, Typography } from '@mui/material';

const Admin: React.FC = () => {
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Administración
            </Typography>
            <Typography variant="body1">
                Solo los administradores tienen acceso a esta sección para gestionar usuarios.
            </Typography>
        </Container>
    );
};

export default Admin;
