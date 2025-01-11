import React, { useEffect, useState } from 'react';
import './AdminProductPage.css';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../services/productService';
import { getToken } from '../../services/authService';

function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [formData, setFormData] = useState({
    category_id: '',
    name: '',
    description: '',
    price: '',
    stock_quantity: '',
    sku: '',
    image_url: '',
    is_active: true,
  });

  const token = getToken(); 

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Chyba pri načítavaní produktov:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    // Pre number polia (price, stock_quantity atď.) môžeme konvertovať na číslo:
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createProduct(
        {
          ...formData,
          price: parseFloat(formData.price), 
        },
        token
      );
      alert('Produkt vytvorený');
      setFormData({
        category_id: '',
        name: '',
        description: '',
        price: '',
        stock_quantity: '',
        sku: '',
        image_url: '',
        is_active: true,
      });
      fetchProducts();
    } catch (error) {
      console.error('Chyba pri vytváraní produktu:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProductId(product.product_id);
    setFormData({
      category_id: product.category_id || '',
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      stock_quantity: product.stock_quantity || '',
      sku: product.sku || '',
      image_url: product.image_url || '',
      is_active: product.is_active,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(
        editingProductId,
        {
          ...formData,
          price: parseFloat(formData.price),
        },
        token
      );
      alert('Produkt upravený');
      setEditingProductId(null);
      setFormData({
        category_id: '',
        name: '',
        description: '',
        price: '',
        stock_quantity: '',
        sku: '',
        image_url: '',
        is_active: true,
      });
      fetchProducts();
    } catch (error) {
      console.error('Chyba pri úprave produktu:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId, token);
      alert('Produkt vymazaný/deaktivovaný');
      fetchProducts();
    } catch (error) {
      console.error('Chyba pri mazaní produktu:', error);
    }
  };

  const handleCancel = () => {
    setEditingProductId(null);
    setFormData({
      category_id: '',
      name: '',
      description: '',
      price: '',
      stock_quantity: '',
      sku: '',
      image_url: '',
      is_active: true,
    });
  };

  const handleSubmit = editingProductId ? handleUpdate : handleCreate;

  return (
    <div className="admin-product-page container">
      <h1 className="text-center my-5 text-white">Správa produktov (Admin)</h1>

      {/* Form */}
      <div className="admin-product-form mb-4">
        <form className="form-dark" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-white">Kategória ID</label>
            <input
              type="number"
              className="form-control"
              name="category_id"
              value={formData.category_id}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Názov</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Popis</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Cena</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Skladové množstvo</label>
            <input
              type="number"
              className="form-control"
              name="stock_quantity"
              value={formData.stock_quantity}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">SKU</label>
            <input
              type="text"
              className="form-control"
              name="sku"
              value={formData.sku}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">URL obrázku</label>
            <input
              type="text"
              className="form-control"
              name="image_url"
              value={formData.image_url}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="btn btn-success me-2">
            {editingProductId ? 'Upraviť produkt' : 'Vytvoriť produkt'}
          </button>
          {editingProductId && (
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Zrušiť
            </button>
          )}
        </form>
      </div>

      {/* Zoznam produktov */}
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Kategória</th>
            <th>Názov</th>
            <th>Cena</th>
            <th>SKU</th>
            <th>Aktívny</th>
            <th>Akcia</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.product_id}>
              <td>{prod.product_id}</td>
              <td>{prod.category_id}</td>
              <td>{prod.name}</td>
              <td>{prod.price} €</td>
              <td>{prod.sku}</td>
              <td>{prod.is_active ? 'Áno' : 'Nie'}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(prod)}
                >
                  Upraviť
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(prod.product_id)}
                >
                  Vymazať
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProductPage;
