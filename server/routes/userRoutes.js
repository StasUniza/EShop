/* server/routes/userRoutes.js */

const express = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

router.get('/', getUsers);


router.post('/', createUser);


router.put('/:user_id', updateUser);


router.delete('/:user_id', deleteUser);

module.exports = router;
