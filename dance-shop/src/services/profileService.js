import axios from 'axios';
import { getToken } from './authService';

export const getProfile = async () => {
  const token = getToken();
  const response = await axios.get('/api/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateProfile = async (data) => {
  const token = getToken();
  const response = await axios.put('/api/users/me', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
