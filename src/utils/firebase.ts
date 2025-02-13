import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Inicializar la aplicación de Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Obtener las instancias de Firestore y Auth
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

// Exportar las instancias
export { db, auth };
