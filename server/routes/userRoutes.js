/* server/routes/userRoutes.js */

const express = require('express');
const {
  getUsers,
  createUser,
  updateUser,
  
  getProfile,
  updateProfile
} = require('../controllers/userController');

const router = express.Router();

// Verejné/hlavné user routy
router.get('/', getUsers);
router.post('/', createUser);
router.put('/:user_id', updateUser);


const { authenticate } = require('../middlewares/authMiddleware');

// Chránené routy pre profil
router.get('/me', authenticate, getProfile);
router.put('/me', authenticate, updateProfile);

module.exports = router;
