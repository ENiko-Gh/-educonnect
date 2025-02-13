import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    EduConnect
                </Typography>
                <Button color="inherit" component={Link} to="/">Inicio</Button>
                <Button color="inherit" component={Link} to="/about">Acerca de</Button>
                <Button color="inherit" component={Link} to="/posts">Publicaciones</Button>
                <Button color="inherit" component={Link} to="/admin">Admin</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;