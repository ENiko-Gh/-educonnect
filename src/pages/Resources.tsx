import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';

const Resources: React.FC = () => {
    const [resource, setResource] = useState('');
    const [resources, setResources] = useState<string[]>([]);

    // Función para agregar materiales
    const addResource = () => {
        setResources([...resources, resource]);
        setResource('');
    };

    return (
        <Container>
            <Typography variant="h5" gutterBottom>Materiales de Estudio</Typography>
            <div>
                {resources.map((res, index) => (
                    <Typography key={index} variant="body1">{res}</Typography>
                ))}
            </div>
            <TextField
                fullWidth
                label="Añadir material (enlace)"
                value={resource}
                onChange={(e) => setResource(e.target.value)}
            />
            <Button variant="contained" onClick={addResource}>Agregar Material</Button>
        </Container>
    );
};

export default Resources;
