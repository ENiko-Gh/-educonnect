import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Typography } from '@mui/material';
// Importación de los componentes faltantes
import Forum from './pages/Forum';
import Resources from './pages/Resources';

// Carga diferida (lazy loading) para mejorar el rendimiento
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Posts = lazy(() => import('./pages/Posts'));
const Admin = lazy(() => import('./pages/Admin'));
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Chat = lazy(() => import('./pages/Chat'));

// Función para obtener el usuario autenticado desde localStorage
const getUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem('user');
    // Comprobar si el valor no es null antes de parsearlo
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error al recuperar el usuario:', error);
    return null;
  }
};

// Componente Header
const Header: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getUserFromLocalStorage());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mi Aplicación
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Inicio
        </Button>
        <Button color="inherit" component={Link} to="/about">
          Acerca de
        </Button>
        <Button color="inherit" component={Link} to="/posts">
          Publicaciones
        </Button>
        <Button color="inherit" component={Link} to="/chat">
          Chat
        </Button>
        {!user ? (
          <>
            <Button color="inherit" component={Link} to="/login">
              Iniciar sesión
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Registrarse
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={handleLogout}>
              Cerrar sesión
            </Button>
            {user.role === 'admin' && (
              <Button color="inherit" component={Link} to="/admin">
                Administrar
              </Button>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

// Componente para proteger rutas de administrador
const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  const user = getUserFromLocalStorage();
  return user && user.role === 'admin' ? <>{element}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Suspense
        fallback={
          <div style={{ textAlign: 'center', padding: '50px', fontSize: '18px' }}>
            <Typography variant="h6">Cargando, por favor espera...</Typography>
          </div>
        }
      >
        <Container maxWidth="md">
          <Routes>
            {/* Rutas principales */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/forum" element={<Forum />} /> {/* Foro importado */}

            {/* Rutas de administración y autenticación */}
            <Route path="/admin" element={<ProtectedRoute element={<Admin />} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/resources" element={<Resources />} /> {/* Resources importado */}

            {/* Ruta del chat */}
            <Route path="/chat" element={<Chat />} />

            {/* Ruta para páginas no encontradas */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </Suspense>
    </Router>
  );
};

export default App;
