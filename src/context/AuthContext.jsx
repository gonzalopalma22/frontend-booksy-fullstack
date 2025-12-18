// src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

// 👇 ESTA LÍNEA DEBE SER 'export const' (Soluciona el error useAuth)
export const useAuth = () => useContext(AuthContext);

// 👇 ESTA LÍNEA DEBE SER 'export const' (Soluciona el error AuthProvider)
export const AuthProvider = ({ children }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('token'); 
});
    
    // Recupera el estado de login desde el almacenamiento local
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};