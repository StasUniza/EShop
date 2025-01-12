import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = '/api/auth';

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);

    Cookies.set('token', response.data.token, { expires: 1 });
    return response.data;
};

export const logoutUser = () => {
    Cookies.remove('token'); 
};

export const getToken = () => {
    return Cookies.get('token');
};


export const verifyToken = async () => {
    const token = getToken();
    if (!token) return null;

    const response = await axios.get(`${API_URL}/verify`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};
