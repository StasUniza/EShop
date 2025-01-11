// server/routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware'); 
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} = require('../controllers/cartController');

// Všetky cesty sú chránené (používateľ musí byť prihlásený)
router.get('/', authenticate, getCart);
router.post('/', authenticate, addToCart);
router.put('/', authenticate, updateCartItem);
router.delete('/:cart_item_id', authenticate, removeCartItem);

module.exports = router;
