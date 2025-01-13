/* src/services/userService.js */

import axios from 'axios';
import Cookies from 'js-cookie';


const API_URL = '/api/users';

export const getToken = () => {
    return Cookies.get('token');
};


export const getUsers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; 
    } catch (error) {
        console.error('Chyba pri získavaní používateľov:', error);
        throw error;
    }
};


export const createUser = async (userData) => {
    try {
        const response = await axios.post(API_URL, userData);
        return response.data;
    } catch (error) {
        console.error('Chyba pri pridávaní používateľa:', error);
        throw error;
    }
};


export const updateUser = async (userId, userData) => {
    try {
        const response = await axios.put(`${API_URL}/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error('Chyba pri aktualizácii používateľa:', error);
        throw error;
    }
};


export const deleteUser = async (userId) => {
    try {
        const token = getToken(); // Získa token
        const response = await axios.delete(`${API_URL}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        return response.data;
    } catch (error) {
        console.error('Chyba pri odstraňovaní používateľa:', error);
        
        
        throw new Error(error.response?.data?.message || 'Nepodarilo sa odstrániť používateľa.');
    }
};




