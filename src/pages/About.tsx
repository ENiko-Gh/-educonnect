import React from 'react';
import { Container, Typography } from '@mui/material';

const About: React.FC = () => {
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Acerca de Nosotros
            </Typography>
            <Typography variant="body1">
                Aquí puedes incluir la información del grupo, misión, visión y valores.
            </Typography>
        </Container>
    );
};

export default About;
