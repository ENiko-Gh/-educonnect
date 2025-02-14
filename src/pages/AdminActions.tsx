import React, { useState } from 'react';
import { Button, Modal, Box, Typography, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface AdminActionsProps {
    pubId: number;
    eliminarPublicacion: (id: number) => void;
    editarPublicacion: (id: number, nuevoTexto: string) => void;
}

const AdminActions: React.FC<AdminActionsProps> = ({ pubId, eliminarPublicacion, editarPublicacion }) => {
    const [openEliminar, setOpenEliminar] = useState(false);
    const [openEditar, setOpenEditar] = useState(false);
    const [password, setPassword] = useState('');
    const [nuevoTexto, setNuevoTexto] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const autenticarAdmin = () => {
        if (password === 'admin123') {
            setIsAuthenticated(true);
        } else {
            alert('Contraseña incorrecta');
        }
    };

    const handleDelete = () => {
        eliminarPublicacion(pubId);
        setOpenEliminar(false);
    };

    const handleEdit = () => {
        if (nuevoTexto.trim()) {
            editarPublicacion(pubId, nuevoTexto);
            setOpenEditar(false);
        }
    };

    return (
        <div>
            {!isAuthenticated ? (
                <div>
                    <TextField
                        label="Contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button onClick={autenticarAdmin} variant="contained" color="primary">
                        Iniciar sesión
                    </Button>
                </div>
            ) : (
                <div>
                    <Button variant="contained" color="primary" onClick={() => setOpenEditar(true)}>
                        Editar
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => setOpenEliminar(true)}>
                        Eliminar
                    </Button>
                </div>
            )}

            <Modal open={openEliminar} onClose={() => setOpenEliminar(false)}>
                <Box sx={{ p: 4, backgroundColor: 'white', margin: 'auto', width: 300 }}>
                    <Typography variant="h6">¿Eliminar publicación?</Typography>
                    <Button onClick={handleDelete} color="error">Eliminar</Button>
                    <Button onClick={() => setOpenEliminar(false)}>Cancelar</Button>
                </Box>
            </Modal>

            <Dialog open={openEditar} onClose={() => setOpenEditar(false)}>
                <DialogTitle>Editar Publicación</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        multiline
                        value={nuevoTexto}
                        onChange={(e) => setNuevoTexto(e.target.value)}
                        autoFocus
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditar(false)}>Cancelar</Button>
                    <Button onClick={handleEdit} color="primary">Guardar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AdminActions;
