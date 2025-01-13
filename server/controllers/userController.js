/* server/controllers/userController.js */

const pool = require('../config/db');
const bcrypt = require('bcrypt');

const getProfile = async (req, res) => {
    const userId = req.user.userId;
    try {
        const result = await pool.query('SELECT first_name, last_name, email, phone_number FROM Users WHERE user_id = $1', [userId]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Chyba pri načítavaní profilu.' });
    }
};

const updateProfile = async (req, res) => {
    const userId = req.user.userId;
    const { first_name, last_name, phone_number } = req.body;

    try {
        await pool.query(
            'UPDATE Users SET first_name = $1, last_name = $2, phone_number = $3 WHERE user_id = $4',
            [first_name, last_name, phone_number, userId]
        );
        res.status(200).json({ message: 'Profil upravený.' });
    } catch (error) {
        res.status(500).json({ message: 'Chyba pri úprave profilu.' });
    }
};

const getUsers = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT u.user_id, u.first_name, u.last_name, u.email, u.phone_number, u.is_active, r.role_name
            FROM Users u
            JOIN Role r ON u.role_id = r.role_id
        `);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const createUser = async (req, res) => {
    const { first_name, last_name, email, password, phone_number, role_id } = req.body;

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ message: 'Všetky povinné polia musia byť vyplnené.' });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Neplatný formát emailu.' });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'Heslo musí mať minimálne 6 znakov.' });
    }

    try {
        const emailCheck = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
        if (emailCheck.rowCount > 0) {
            return res.status(400).json({ message: 'Email už existuje.' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const result = await pool.query(
            `INSERT INTO Users (role_id, first_name, last_name, email, password, phone_number, date_joined, is_active)
             VALUES ($1, $2, $3, $4, $5, $6, NOW(), TRUE) RETURNING *`,
            [role_id || 2, first_name, last_name, email, hashedPassword, phone_number || null]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateUser = async (req, res) => {
    const userId = req.params.user_id;
    const { first_name, last_name, email, phone_number, is_active, role_id } = req.body;

    if (!first_name || !last_name || !email) {
        return res.status(400).json({ message: 'Všetky povinné polia musia byť vyplnené.' });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Neplatný formát emailu.' });
    }

    try {
        const emailCheck = await pool.query('SELECT * FROM Users WHERE email = $1 AND user_id != $2', [email, userId]);
        if (emailCheck.rowCount > 0) {
            return res.status(400).json({ message: 'Email už existuje.' });
        }

        const result = await pool.query(
            `UPDATE Users
             SET role_id = $1, first_name = $2, last_name = $3, email = $4, phone_number = $5, is_active = $6
             WHERE user_id = $7 RETURNING *`,
            [role_id || 2, first_name, last_name, email, phone_number || null, is_active, userId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Používateľ nenájdený.' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteUser = async (req, res) => {
    const { user_id } = req.params;

    try {
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

module.exports = { getUsers, createUser, updateUser, getProfile, updateProfile, deleteUser };
