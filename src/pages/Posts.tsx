import React from 'react';
import { Container, Typography } from '@mui/material';

const Posts: React.FC = () => {
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Publicaciones
            </Typography>
            <Typography variant="body1">
                Aquí se mostrarán las publicaciones. Accesibles para todos los roles.
            </Typography>
        </Container>
    );
};

export default Posts;
