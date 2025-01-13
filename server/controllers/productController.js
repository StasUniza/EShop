// server/controllers/productController.js

const pool = require('../config/db');


const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Product WHERE is_active = TRUE');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Chyba pri načítavaní produktov.' });
  }
};


const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM Product WHERE product_id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Produkt nenájdený.' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Chyba pri načítavaní produktu.' });
  }
};


const createProduct = async (req, res) => {
  const { category_id, name, description, price, stock_quantity, sku, image_url } = req.body;
  
 
  if (!category_id || !name || !price || !stock_quantity || !sku) {
    return res.status(400).json({ message: 'Povinné údaje (category_id, name, price, stock_quantity, sku) nie sú vyplnené.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO Product 
        (category_id, name, description, price, stock_quantity, sku, image_url, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, TRUE) 
       RETURNING *`,
      [category_id, name, description || null, price, stock_quantity, sku, image_url || null]
    );
    res.status(201).json({ message: 'Produkt bol vytvorený.', product: result.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Chyba pri vytváraní produktu.' });
  }
};


const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { category_id, name, description, price, stock_quantity, sku, image_url, is_active } = req.body;

  try {
    const result = await pool.query(
      `UPDATE Product
       SET category_id = $1,
           name = $2,
           description = $3,
           price = $4,
           stock_quantity = $5,
           sku = $6,
           image_url = $7,
           is_active = $8
       WHERE product_id = $9
       RETURNING *`,
      [category_id, name, description, price, stock_quantity, sku, image_url, is_active, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Produkt nenájdený.' });
    }

    res.status(200).json({ message: 'Produkt bol upravený.', product: result.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Chyba pri úprave produktu.' });
  }
};


const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM Product
       WHERE product_id = $1 
       RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Produkt nenájdený.' });
    }

    res.status(200).json({ message: 'Produkt bol úspešne vymazaný.', product: result.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Chyba pri mazaní produktu.' });
  }
};


module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
