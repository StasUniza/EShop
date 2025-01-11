import axios from 'axios';

// Získať všetky produkty
export const getAllProducts = async () => {
  const response = await axios.get('/api/products');
  return response.data;
};

// Získať detail produktu
export const getProductById = async (id) => {
  const response = await axios.get(`/api/products/${id}`);
  return response.data;
};

// Vytvoriť produkt (iba admin)
export const createProduct = async (productData, token) => {
  const response = await axios.post('/api/products', productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Upraviť produkt (iba admin)
export const updateProduct = async (id, productData, token) => {
  const response = await axios.put(`/api/products/${id}`, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Zmazať produkt (iba admin)
export const deleteProduct = async (id, token) => {
  const response = await axios.delete(`/api/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
