import React, { useState, useEffect } from 'react';
import { TextField, Button, Modal, Box, Typography } from '@mui/material';

const Posts: React.FC = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [password, setPassword] = useState<string>('');
    const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [editingPost, setEditingPost] = useState<{ id: number; title: string; content: string } | null>(null);

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
        if (savedPosts.length === 0) {
            const initialPosts = [
                { id: 1, title: 'Programación', content: 'Contenido de la publicación 1.' },
                { id: 2, title: 'Publicación 2', content: 'Contenido de la publicación 2' },
                { id: 3, title: 'Publicación 3', content: 'Contenido de la publicación 3' },
                { id: 4, title: 'Publicación 4', content: 'Contenido de la publicación 4' },
            ];
            localStorage.setItem('posts', JSON.stringify(initialPosts));
            setPosts(initialPosts);
        } else {
            setPosts(savedPosts);
        }
    }, []);

    const openAdminModal = () => {
        setIsAdminModalOpen(true);
    };

    const closeAdminModal = () => {
        setIsAdminModalOpen(false);
        setPassword('');
        setIsAuthenticated(false);
        setEditingPost(null);
    };

    const handleAdminLogin = () => {
        if (password === 'admin123') {
            setIsAuthenticated(true);
        } else {
            alert('Contraseña incorrecta');
        }
    };

    const handleDelete = (postId: number) => {
        const updatedPosts = posts.filter(post => post.id !== postId);
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    const handleEdit = (post: any) => {
        setEditingPost({ ...post });
    };

    const handleSaveEdit = () => {
        if (editingPost) {
            const updatedPosts = posts.map(post => post.id === editingPost.id ? editingPost : post);
            setPosts(updatedPosts);
            localStorage.setItem('posts', JSON.stringify(updatedPosts));
            setEditingPost(null);
        }
    };

    // Función para alternar los colores de fondo
    const getBackgroundColor = (index: number) => {
        return index % 3 === 0 ? '#e0f7fa' : index % 3 === 1 ? '#f1f8e9' : '#f5f5f5'; // Celeste, Verde claro y Gris
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Publicaciones
            </Typography>
            <Button onClick={openAdminModal} variant="contained" color="primary">
                Administrador
            </Button>
            {posts.map((post, index) => (
                <div key={post.id} style={{ backgroundColor: getBackgroundColor(index), marginBottom: '16px', padding: '16px', borderRadius: '8px' }}>
                    <Typography variant="h6" style={{ color: '#00695c' }}>{post.title}</Typography> {/* Título en color verde oscuro */}
                    <Typography variant="body1" style={{ color: '#424242' }}>{post.content}</Typography> {/* Contenido en gris oscuro */}
                </div>
            ))}

            {/* Modal de Administrador */}
            <Modal open={isAdminModalOpen} onClose={closeAdminModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        padding: 2,
                        borderRadius: 2,
                        boxShadow: 24,
                        width: 400,
                    }}
                >
                    {!isAuthenticated ? (
                        <>
                            <Typography variant="h6" gutterBottom>
                                Ingrese la contraseña de administrador
                            </Typography>
                            <TextField
                                label="Contraseña"
                                type="password"
                                variant="outlined"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                margin="normal"
                            />
                            <Button onClick={handleAdminLogin} variant="contained" color="primary" fullWidth>
                                Ingresar
                            </Button>
                        </>
                    ) : (
                        <>
                            <Typography variant="h6" gutterBottom>
                                Administrar Publicaciones
                            </Typography>
                            {posts.map(post => (
                                <Box key={post.id} mb={2} p={1} border={1} borderRadius={1}>
                                    <TextField
                                        fullWidth
                                        label="Título"
                                        value={editingPost && editingPost.id === post.id ? editingPost.title : post.title}
                                        onChange={(e) =>
                                            setEditingPost((prev) => prev ? { ...prev, title: e.target.value } : null)
                                        }
                                        disabled={editingPost ? editingPost.id !== post.id : true}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Contenido"
                                        multiline
                                        rows={3}
                                        value={editingPost && editingPost.id === post.id ? editingPost.content : post.content}
                                        onChange={(e) =>
                                            setEditingPost((prev) => prev ? { ...prev, content: e.target.value } : null)
                                        }
                                        disabled={editingPost ? editingPost.id !== post.id : true}
                                    />
                                    <Button onClick={() => handleEdit(post)} variant="outlined" color="primary">
                                        Editar
                                    </Button>
                                    <Button onClick={() => handleDelete(post.id)} variant="outlined" color="secondary">
                                        Eliminar
                                    </Button>
                                    {editingPost && editingPost.id === post.id && (
                                        <Button onClick={handleSaveEdit} variant="contained" color="success">
                                            Guardar
                                        </Button>
                                    )}
                                </Box>
                            ))}
                            <Button onClick={closeAdminModal} variant="contained" color="error" fullWidth>
                                Salir
                            </Button>
                        </>
                    )}
                </Box>
            </Modal>
        </div>
    );
};

export default Posts;
