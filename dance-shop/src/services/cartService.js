import axios from 'axios';
import { getToken } from './authService'; // Ak používaš cookies alebo localStorage

export const getCart = async () => {
  const token = getToken();
  const response = await axios.get('/api/cart', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addToCart = async (product_id, quantity = 1) => {
  const token = getToken();
  const response = await axios.post(
    '/api/cart',
    { product_id, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const updateCartItem = async (cart_item_id, quantity) => {
  const token = getToken();
  const response = await axios.put(
    '/api/cart',
    { cart_item_id, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const removeCartItem = async (cart_item_id) => {
  const token = getToken();
  const response = await axios.delete(`/api/cart/${cart_item_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
