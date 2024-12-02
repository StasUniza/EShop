/* server/controllers/userController.js */

const pool = require('../config/db');
const bcrypt = require('bcrypt');


// Získať všetkých používateľov
const getUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT user_id, role_id, first_name, last_name, email, password, phone_number, date_joined, is_active FROM Users');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Pridať nového používateľa
const createUser = async (req, res) => {
    const { role_id, first_name, last_name, email, password, phone_number } = req.body;

    // Overenie povinných polí
    if (!role_id || !first_name || !last_name || !email || !password) {
        return res.status(400).json({ message: 'Všetky povinné polia musia byť vyplnené.' });
    }

    try {
        // Hashovanie hesla
        const saltRounds = 10; // Bezpečnostný parameter (čím vyššie, tým bezpečnejšie, ale pomalšie)
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Uloženie používateľa do databázy
        const result = await pool.query(
            `INSERT INTO Users (role_id, first_name, last_name, email, password, phone_number, date_joined, is_active)
             VALUES ($1, $2, $3, $4, $5, $6, NOW(), TRUE) RETURNING *`,
            [role_id, first_name, last_name, email, hashedPassword, phone_number || null]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



// Aktualizovať používateľa
const updateUser = async (req, res) => {
    const { user_id } = req.params; // Získanie ID používateľa z URL
    const { role_id, first_name, last_name, email, phone_number, is_active } = req.body;

    try {
        // Aktualizácia používateľa
        const result = await pool.query(
            `UPDATE Users 
             SET role_id = $1, first_name = $2, last_name = $3, email = $4, phone_number = $5, is_active = $6 
             WHERE user_id = $7 RETURNING *`,
            [role_id, first_name, last_name, email, phone_number, is_active, user_id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Používateľ nebol nájdený.' });
        }

        res.status(200).json({ message: 'Používateľ bol aktualizovaný.', user: result.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Odstrániť používateľa
const deleteUser = async (req, res) => {
    const { user_id } = req.params;

    try {
        // Odstránenie používateľa
        const result = await pool.query(`DELETE FROM Users WHERE user_id = $1 RETURNING *`, [user_id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Používateľ nebol nájdený.' });
        }

        res.status(200).json({ message: 'Používateľ bol odstránený.', user: result.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { getUsers, createUser, updateUser, deleteUser };