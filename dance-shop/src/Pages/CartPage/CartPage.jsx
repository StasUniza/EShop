// src/Pages/CartPage/CartPage.jsx

import React, { useState } from 'react';
import './CartPage.css';

function CartPage() {
  
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Tanečné topánky Classic',
      price: 59.99,
      quantity: 1,
      image: require('../../Assets/Images/dance_shoes.png'),
    },
    {
      id: 2,
      name: 'Tanečné šaty Elegance',
      price: 89.99,
      quantity: 2,
      image: require('../../Assets/Images/dance_dress.png'),
    },
    {
      id: 3,
      name: 'Kefa na tanečné topánky',
      price: 9.99,
      quantity: 1,
      image: require('../../Assets/Images/dance_shoe_brush.png'),
    },
  ]);

  
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  
  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  
  const calculateTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="cart-page container">
      <h1 className="text-center my-5 text-white">Nákupný košík</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-white">Váš košík je prázdny.</p>
      ) : (
        <>
         
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th>Obrázok</th>
                <th>Názov</th>
                <th>Cena</th>
                <th>Množstvo</th>
                <th>Celková cena</th>
                <th>Akcia</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price.toFixed(2)} €</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      className="form-control"
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    />
                  </td>
                  <td>{(item.price * item.quantity).toFixed(2)} €</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Odstrániť
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          
          <div className="summary text-end">
            <h4>Celková cena: {calculateTotalPrice()} €</h4>
            <button className="btn btn-success mt-3">Pokračovať na platbu</button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
