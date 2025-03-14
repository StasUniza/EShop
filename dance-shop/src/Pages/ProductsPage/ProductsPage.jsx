//src\Pages\AdminProductsPage\ProductsPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductsPage.css';
import { getAllProducts } from '../../services/productService';
import { addToCart } from '../../services/cartService';
import { getUserInfo } from '../../services/authService';


function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('všetky');

  const handleAddToCart = async (productId) => {
    const userInfo = getUserInfo(); 
    if (!userInfo) {
        alert('Nie ste prihlásený. Prihláste sa, aby ste mohli pridávať produkty do košíka.');
        return;
    }

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

  
  const filteredProducts = selectedCategory === 'všetky'
    ? products
    : products.filter((product) => {
        if (selectedCategory === 'topanky') return product.category_id === 4;
        if (selectedCategory === 'oblecenie') return product.category_id === 5;
        if (selectedCategory === 'doplnky') return product.category_id === 6;
        return false; 
    });

  return (
    <div className="products-page container">
      <h1 className="text-center my-5 text-white">Produkty</h1>

      <div className="filters text-center mb-4">
    <button
        className={`btn mx-2 mb-2 ${selectedCategory === 'všetky' ? 'btn-custom-active' : 'btn-outline-light'}`}
        onClick={() => setSelectedCategory('všetky')}
    >
        Všetky
    </button>
    <button
        className={`btn mx-2 mb-2 ${selectedCategory === 'topanky' ? 'btn-custom-active' : 'btn-outline-light'}`}
        onClick={() => setSelectedCategory('topanky')}
    >
        Topánky
    </button>
    <button
        className={`btn mx-2 mb-2 ${selectedCategory === 'oblecenie' ? 'btn-custom-active' : 'btn-outline-light'}`}
        onClick={() => setSelectedCategory('oblecenie')}
    >
        Oblečenie
    </button>
    <button
        className={`btn mx-2 mb-2 ${selectedCategory === 'doplnky' ? 'btn-custom-active' : 'btn-outline-light'}`}
        onClick={() => setSelectedCategory('doplnky')}
    >
        Doplnky
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
