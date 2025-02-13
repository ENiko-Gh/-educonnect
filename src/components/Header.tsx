import React, { useEffect, useState, useCallback } from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// Tipos de usuario
interface User {
    role: 'admin' | 'publicador' | 'usuario';
}

// Función para obtener el usuario desde localStorage de forma segura
const getUserFromLocalStorage = (): User | null => {
    try {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        console.error('Error al obtener el usuario del localStorage', error);
        return null;
    }
};

// Función para eliminar el usuario del localStorage
const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
};

const Header: React.FC = () => {
    const [user, setUser] = useState<User | null>(getUserFromLocalStorage());

    // Actualizar el estado del usuario
    useEffect(() => {
        // Este efecto se ejecuta solo una vez al montar el componente
        const storedUser = getUserFromLocalStorage();
        setUser(storedUser);
    }, []);

    // Manejar el logout
    const handleLogout = useCallback(() => {
        removeUserFromLocalStorage();
        setUser(null);  // Actualiza el estado del usuario
    }, []);

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Mi Aplicación EduConnect
                </Typography>

                {/* Enlaces de navegación principales */}
                <Button color="inherit" component={Link} to="/">Inicio</Button>
                <Button color="inherit" component={Link} to="/about">Acerca de</Button>
                <Button color="inherit" component={Link} to="/posts">Publicaciones</Button>
                <Button color="inherit" component={Link} to="/chat">Chat</Button>

                {/* Mostrar opciones dependiendo del estado del usuario */}
                {!user ? (
                    <>
                        <Button color="inherit" component={Link} to="/login">Iniciar sesión</Button>
                        <Button color="inherit" component={Link} to="/register">Registrarse</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" onClick={handleLogout}>Cerrar sesión</Button>
                        {user.role === 'admin' && (
                            <Button color="inherit" component={Link} to="/admin">Administrar</Button>
                        )}
                        {user.role === 'publicador' && (
                            <Button color="inherit" component={Link} to="/create-post">Crear Publicación</Button>
                        )}
                        {user.role === 'usuario' && (
                            <Button color="inherit" component={Link} to="/user-profile">Perfil</Button>
                        )}
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
