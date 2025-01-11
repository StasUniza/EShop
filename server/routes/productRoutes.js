const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// Import middleware na overenie JWT (ak chceš chrániť niektoré routy)

const { authenticate, authenticateAdmin } = require('../middlewares/authMiddleware');


// Nechceme, aby každý mohol vytvárať produkty, tak tie routy môžu byť chránené
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Admin routy
router.post('/', authenticate, authenticateAdmin, createProduct);
router.put('/:id', authenticate, authenticateAdmin, updateProduct);
router.delete('/:id', authenticate, authenticateAdmin, deleteProduct);

module.exports = router;
