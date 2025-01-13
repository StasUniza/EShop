import React from 'react'; 
import { Navigate } from 'react-router-dom';
import { getToken, getUserInfo } from '../services/authService';

export function ProtectedRoute({ children }) {
    const token = getToken();

    return token ? children : <Navigate to="/login" />;
}

export function AdminProtectedRoute({ children }) {
    const token = getToken(); 
    const userInfo = token ? getUserInfo() : null;

    if (!token) {
        return <Navigate to="/login" />; 
    }

    if (userInfo?.roleId !== 1) {
        return <Navigate to="/" />; 
    }

    return children; 
}
