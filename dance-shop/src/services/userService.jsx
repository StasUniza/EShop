/* src/services/userService.js */

import axios from 'axios';

const API_URL = '/api/users';


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
        const response = await axios.delete(`${API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Chyba pri odstraňovaní používateľa:', error);
        throw error;
    }
};




