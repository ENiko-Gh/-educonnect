// Tipos para los usuarios
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
}

// Función para guardar usuarios en localStorage
export const saveUsersToLocalStorage = (users: User[]) => {
    localStorage.setItem('users', JSON.stringify(users));
};

// Función para cargar usuarios desde localStorage
export const getUsersFromLocalStorage = (): User[] => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];  // Devuelve un array vacío si no hay datos
};

// Función para agregar un usuario al localStorage
export const addUserToLocalStorage = (user: User) => {
    const users = getUsersFromLocalStorage();
    users.push(user);
    saveUsersToLocalStorage(users);
};

// Función para verificar si un usuario está autenticado
export const isUserAuthenticated = (): boolean => {
    const user = getCurrentUser();
    return user !== null;  // Si hay un usuario guardado, está autenticado
};

// Función para eliminar usuarios (o cerrar sesión)
export const clearUsersFromLocalStorage = () => {
    localStorage.removeItem('usuarioActual');
};

// Función para obtener el usuario actual
export const getCurrentUser = (): User | null => {
    const user = localStorage.getItem('usuarioActual');
    return user ? JSON.parse(user) : null;  // Si hay usuario, lo devuelve; si no, null
};

// Función de login
export const login = (email: string, password: string): User | null => {
    const users = getUsersFromLocalStorage();

    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('usuarioActual', JSON.stringify(user));  // Guardar el usuario actual
        return user;
    } else {
        return null;  // Credenciales incorrectas
    }
};

// Función de logout
export const logout = () => {
    clearUsersFromLocalStorage();
};
