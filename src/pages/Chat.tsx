import React, { useState, useEffect } from 'react';
import { db, auth } from '../utils/firebase';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { collection, query, orderBy, onSnapshot, addDoc, Timestamp, DocumentData } from 'firebase/firestore';
import { User, onAuthStateChanged } from 'firebase/auth';

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<DocumentData[]>([]);
    const [message, setMessage] = useState<string>('');
    const [user, setUser] = useState<User | null>(null);

    // Detectar cambios en la autenticación
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Leer los mensajes en tiempo real
    useEffect(() => {
        const messagesRef = collection(db, 'messages');
        const q = query(messagesRef, orderBy('timestamp', 'asc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map((doc) => doc.data()));
        });

        return () => unsubscribe();
    }, []);

    // Enviar mensaje
    const sendMessage = async () => {
        if (message.trim()) {
            try {
                await addDoc(collection(db, 'messages'), {
                    user: user?.email || 'Anónimo',
                    message,
                    timestamp: Timestamp.now(),
                });
                setMessage('');
            } catch (error) {
                console.error('Error al enviar el mensaje:', error);
            }
        }
    };

    return (
        <Container>
            <Typography variant="h5" gutterBottom>
                Chat en Tiempo Real
            </Typography>
            <Box sx={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                {messages.map((msg, index) => (
                    <Typography key={index} variant="body1">
                        <strong>{msg.user}:</strong> {msg.message}
                    </Typography>
                ))}
            </Box>
            {user ? (
                <Box mt={2}>
                    <TextField
                        fullWidth
                        label="Escribe un mensaje"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button variant="contained" onClick={sendMessage} sx={{ mt: 1 }}>
                        Enviar
                    </Button>
                </Box>
            ) : (
                <Typography variant="body2" mt={2}>
                    Por favor, inicia sesión para participar en el chat.
                </Typography>
            )}
        </Container>
    );
};

export default Chat;
