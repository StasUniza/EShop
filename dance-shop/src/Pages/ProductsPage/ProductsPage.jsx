//src\Pages\AdminProductsPage\ProductsPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductsPage.css';
import { getAllProducts } from '../../services/productService';
import { addToCart } from '../../services/cartService';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('všetky');

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1); 
      alert('Produkt pridaný do košíka');
    } catch (error) {
      console.error('Chyba pri pridávaní do košíka:', error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts(); 
        setProducts(data);
      } catch (error) {
        console.error('Chyba pri načítavaní produktov:', error);
      }
    };
    fetchProducts();
  }, []);

  
  const filteredProducts =
    selectedCategory === 'všetky'
      ? products
      : products.filter((product) => product.category_id === parseInt(selectedCategory));

  return (
    <div className="products-page container">
      <h1 className="text-center my-5 text-white">Produkty</h1>

      <div className="filters text-center mb-4">
        <button
          className={`btn mx-2 mb-2 ${
            selectedCategory === 'všetky' ? 'btn-custom-active' : 'btn-outline-light'
          }`}
          onClick={() => setSelectedCategory('všetky')}
        >
          Všetky
        </button>
      </div>

      <div className="row justify-content-center">
        {filteredProducts.map((product) => {
          const priceNum = parseFloat(product.price);

          return (
            <div className="col-lg-2 col-md-4 col-sm-6 col-6 mb-4" key={product.product_id}>
              <div className="card product-card h-100">
                <Link to={`/products/${product.product_id}`} className="text-decoration-none">
                  <img
                    src={product.image_url || '/placeholder.jpg'}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">{product.name}</h5>
                    <p className="card-text text-center">
                      {!isNaN(priceNum)
                        ? priceNum.toFixed(2) + ' €'
                        : 'Neplatná cena'}
                    </p>
                  </div>
                </Link>
                <div className="card-footer text-center">
                  <button className="btn btn-custom w-100" onClick={() => handleAddToCart(product.product_id)}>
                    Pridať do košíka
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductsPage;
