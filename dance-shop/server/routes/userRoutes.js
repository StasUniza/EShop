/* server/routes/userRoutes.js */

const express = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

// GET /api/users - Získať všetkých používateľov
router.get('/', getUsers);

// POST /api/users - Pridať nového používateľa
router.post('/', createUser);

// PUT /api/users/:user_id - Aktualizovať používateľa
router.put('/:user_id', updateUser);

// DELETE /api/users/:user_id - Odstrániť používateľa
router.delete('/:user_id', deleteUser);

module.exports = router;
