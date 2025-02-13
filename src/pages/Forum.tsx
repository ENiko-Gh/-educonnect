import React, { useState, useEffect } from 'react';
import { db } from '../utils/firebase';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { collection, query, orderBy, onSnapshot, addDoc, Timestamp, DocumentData } from 'firebase/firestore';

const Forum: React.FC = () => {
    const [questions, setQuestions] = useState<DocumentData[]>([]);
    const [question, setQuestion] = useState<string>('');

    // Leer preguntas del foro en tiempo real
    useEffect(() => {
        const forumRef = collection(db, 'forum');
        const q = query(forumRef, orderBy('timestamp', 'asc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setQuestions(snapshot.docs.map((doc) => doc.data()));
        });

        return () => unsubscribe();
    }, []);

    // Publicar una nueva pregunta
    const askQuestion = async () => {
        if (question.trim()) {
            try {
                await addDoc(collection(db, 'forum'), {
                    question,
                    timestamp: Timestamp.now(),
                });
                setQuestion('');
            } catch (error) {
                console.error('Error al publicar la pregunta:', error);
            }
        }
    };

    return (
        <Container>
            <Typography variant="h5" gutterBottom>
                Foro de Preguntas
            </Typography>
            <Box sx={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                {questions.map((q, index) => (
                    <Typography key={index} variant="body1">
                        <strong>Pregunta:</strong> {q.question}
                    </Typography>
                ))}
            </Box>
            <Box mt={2}>
                <TextField
                    fullWidth
                    label="Haz una pregunta"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <Button variant="contained" onClick={askQuestion} sx={{ mt: 1 }}>
                    Publicar
                </Button>
            </Box>
        </Container>
    );
};

export default Forum;
