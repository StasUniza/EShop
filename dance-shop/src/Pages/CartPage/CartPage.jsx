import React, { useEffect, useState } from 'react';
import './CartPage.css';
import {
  getCart,
  removeCartItem,
  updateCartItem,
} from '../../services/cartService';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCart(); 
        if (result.items) {
          setCartItems(result.items);
        }
      } catch (error) {
        console.error('Chyba pri načítavaní košíka:', error);
      }
    };

    fetchData();
  }, []);

  const handleRemoveItem = async (cart_item_id) => {
    try {
      await removeCartItem(cart_item_id);
      setCartItems((prevItems) => prevItems.filter((item) => item.cart_item_id !== cart_item_id));
    } catch (error) {
      console.error('Chyba pri odstraňovaní položky:', error);
    }
  };

  const handleQuantityChange = async (cart_item_id, newQuantity) => {
    if (newQuantity < 1) return; 
    try {
      await updateCartItem(cart_item_id, newQuantity);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.cart_item_id === cart_item_id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('Chyba pri úprave množstva:', error);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => {
        const priceNum = parseFloat(item.price);
        if (isNaN(priceNum)) return total; 
        return total + priceNum * item.quantity;
      }, 0)
      .toFixed(2);
  };

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
              {cartItems.map((item) => {
                const priceNum = parseFloat(item.price) || 0;
                const itemTotal = (priceNum * item.quantity).toFixed(2);

                return (
                  <tr key={item.cart_item_id}>
                    <td>
                      <img
                        src={item.image_url || require('../../Assets/Images/dance_shoes.png')} 
                        alt={item.name}
                        className="cart-item-image"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{priceNum.toFixed(2)} €</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        className="form-control"
                        onChange={(e) => handleQuantityChange(item.cart_item_id, parseInt(e.target.value))}
                      />
                    </td>
                    <td>{itemTotal} €</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleRemoveItem(item.cart_item_id)}
                      >
                        Odstrániť
                      </button>
                    </td>
                  </tr>
                );
              })}
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
