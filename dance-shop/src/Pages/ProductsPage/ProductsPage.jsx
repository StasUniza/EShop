// src/Pages/ProductsPage/ProductsPage.jsx

import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import './ProductsPage.css';

// Mock dáta produktov (neskôr nahradíte reálnymi dátami z API alebo databázy)
const productsData = [
  {
    id: 1,
    name: 'Tanečné topánky Classic',
    price: 59.99,
    image: require('../../Assets/Images/dance_shoes.png'),
    category: 'topánky',
  },
  {
    id: 2,
    name: 'Tanečné šaty Elegance',
    price: 89.99,
    image: require('../../Assets/Images/dance_dress.png'),
    category: 'oblečenie',
  },
  {
    id: 3,
    name: 'Kefa na tanečné topánky',
    price: 9.99,
    image: require('../../Assets/Images/dance_shoe_brush.png'),
    category: 'doplnky',
  },
  // ...pridajte ďalšie produkty podľa potreby
];

function ProductsPage() {
  const [products, setProducts] = useState(productsData);
  const [selectedCategory, setSelectedCategory] = useState('všetky');

  // Filtrovanie produktov podľa kategórie
  useEffect(() => {
    if (selectedCategory === 'všetky') {
      setProducts(productsData);
    } else {
      const filteredProducts = productsData.filter(
        (product) => product.category === selectedCategory
      );
      setProducts(filteredProducts);
    }
  }, [selectedCategory]);

  return (
    <div className="products-page container">
      <h1 className="text-center my-5 text-white">Produkty</h1>

      {/* Filtre */}
      <div className="filters text-center mb-4">
        <button
          className={`btn mx-2 mb-2 ${
            selectedCategory === 'všetky' ? 'btn-custom-active' : 'btn-outline-light'
          }`}
          onClick={() => setSelectedCategory('všetky')}
        >
          Všetky
        </button>
        <button
          className={`btn mx-2 mb-2 ${
            selectedCategory === 'topánky' ? 'btn-custom-active' : 'btn-outline-light'
          }`}
          onClick={() => setSelectedCategory('topánky')}
        >
          Topánky
        </button>
        <button
          className={`btn mx-2 mb-2 ${
            selectedCategory === 'oblečenie' ? 'btn-custom-active' : 'btn-outline-light'
          }`}
          onClick={() => setSelectedCategory('oblečenie')}
        >
          Oblečenie
        </button>
        <button
          className={`btn mx-2 mb-2 ${
            selectedCategory === 'doplnky' ? 'btn-custom-active' : 'btn-outline-light'
          }`}
          onClick={() => setSelectedCategory('doplnky')}
        >
          Doplnky
        </button>
      </div>

      {/* Zoznam produktov */}
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 col-sm-6 col-xs-12 mb-4" key={product.id}>
            <div className="card product-card h-100">
              <Link to={`/products/${product.id}`} className="text-decoration-none">
                <img
                  src={product.image.default}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">{product.name}</h5>
                  <p className="card-text text-center">{product.price.toFixed(2)} €</p>
                </div>
              </Link>
              <div className="card-footer text-center">
                <button className="btn btn-custom w-100">Pridať do košíka</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
