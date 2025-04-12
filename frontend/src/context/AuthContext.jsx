// context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return Boolean(localStorage.getItem("token"));
    });

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, 
            login,
            logout 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Create a custom hook for using the context
export const useAuth = () => {
    return useContext(AuthContext);
};