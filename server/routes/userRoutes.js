/* server/routes/userRoutes.js */

const express = require('express');
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile
} = require('../controllers/userController');

const router = express.Router();

const { authenticate, authenticateAdmin } = require('../middlewares/authMiddleware');

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:user_id', updateUser);
router.delete('/:user_id', authenticate, authenticateAdmin, deleteUser); 



router.get('/me', authenticate, getProfile);
router.put('/me', authenticate, updateProfile);

module.exports = router;
