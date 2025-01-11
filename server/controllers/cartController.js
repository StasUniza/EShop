const pool = require('../config/db');

// Zobraziť košík pre prihláseného používateľa
const getCart = async (req, res) => {
  try {
    const userId = req.user.userId; // z JWT
    // Zistíme, či má používateľ vôbec košík
    const cartQuery = await pool.query('SELECT * FROM Cart WHERE user_id = $1', [userId]);
    if (cartQuery.rowCount === 0) {
      // Vytvoríme nový košík
      const newCart = await pool.query(
        'INSERT INTO Cart (user_id, created_at, updated_at) VALUES ($1, NOW(), NOW()) RETURNING *',
        [userId]
      );
      return res.status(200).json({ cart: newCart.rows[0], items: [] });
    }

    const cart = cartQuery.rows[0];
    // Získame položky
    const itemsQuery = await pool.query(
      `SELECT cartitem.*, product.name, product.price, product.image_url 
       FROM cartitem 
       JOIN product ON cartitem.product_id = product.product_id
       WHERE cart_id = $1`,
      [cart.cart_id]
    );

    res.status(200).json({ cart, items: itemsQuery.rows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Chyba pri načítavaní košíka.' });
  }
};

// Pridať produkt do košíka
const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { product_id, quantity } = req.body;

    // Najprv zistíme, či existuje košík
    let cartQuery = await pool.query('SELECT * FROM Cart WHERE user_id = $1', [userId]);
    let cart = cartQuery.rows[0];
    if (!cart) {
      // Vytvoríme nový košík
      const newCart = await pool.query(
        'INSERT INTO Cart (user_id, created_at, updated_at) VALUES ($1, NOW(), NOW()) RETURNING *',
        [userId]
      );
      cart = newCart.rows[0];
    }

    // Overíme, či položka už existuje v košíku
    const existingItem = await pool.query(
      'SELECT * FROM CartItem WHERE cart_id = $1 AND product_id = $2',
      [cart.cart_id, product_id]
    );

    if (existingItem.rowCount > 0) {
      // Ak existuje, zvýšime množstvo
      const updatedQuantity = existingItem.rows[0].quantity + quantity;
      const updatedItem = await pool.query(
        'UPDATE CartItem SET quantity = $1 WHERE cart_item_id = $2 RETURNING *',
        [updatedQuantity, existingItem.rows[0].cart_item_id]
      );
      return res.status(200).json({ message: 'Položka v košíku aktualizovaná.', item: updatedItem.rows[0] });
    } else {
      // Inak vytvoríme novú položku
      const newItem = await pool.query(
        'INSERT INTO CartItem (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
        [cart.cart_id, product_id, quantity]
      );
      return res.status(201).json({ message: 'Položka pridaná do košíka.', item: newItem.rows[0] });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Chyba pri pridávaní produktu do košíka.' });
  }
};

// Upraviť množstvo položky v košíku
const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { cart_item_id, quantity } = req.body;

    // Možno overiť, či položka patrí rovnakému košíku
    const itemQuery = await pool.query('SELECT * FROM CartItem WHERE cart_item_id = $1', [cart_item_id]);
    if (itemQuery.rowCount === 0) {
      return res.status(404).json({ message: 'Položka v košíku neexistuje.' });
    }

    await pool.query(
      'UPDATE CartItem SET quantity = $1 WHERE cart_item_id = $2',
      [quantity, cart_item_id]
    );
    res.status(200).json({ message: 'Množstvo položky bolo upravené.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Chyba pri úprave položky v košíku.' });
  }
};

// Odstrániť položku z košíka
const removeCartItem = async (req, res) => {
  try {
    const { cart_item_id } = req.params;

    const result = await pool.query('DELETE FROM CartItem WHERE cart_item_id = $1 RETURNING *', [cart_item_id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Položka v košíku neexistuje.' });
    }

    res.status(200).json({ message: 'Položka odstránená z košíka.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Chyba pri odstraňovaní položky z košíka.' });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
};
