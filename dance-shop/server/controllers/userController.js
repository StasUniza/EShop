/* server/controllers/userController.js */

const pool = require('../config/db');
const bcrypt = require('bcrypt');



const getUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT user_id, role_id, first_name, last_name, email, password, phone_number, date_joined, is_active FROM Users');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //AI
    return emailRegex.test(email);
    //return email.includes('@');
};



const createUser = async (req, res) => {
    const {first_name, last_name, email, password, phone_number } = req.body;
    console.log(req.body);


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

        console.log(hashedPassword)

        const result = await pool.query(
            `INSERT INTO Users (role_id, first_name, last_name, email, password, phone_number, date_joined, is_active)
             VALUES (2, $1, $2, $3, $4, $5, NOW(), TRUE) RETURNING *`,
            [first_name, last_name, email, hashedPassword, phone_number || null]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};




const updateUser = async (req, res) => {
    const userId = req.params.user_id;
    const { first_name, last_name, email, phone_number, is_active } = req.body;


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
             SET role_id = 2, first_name = $1, last_name = $2, email = $3, phone_number = $4, is_active = $5
             WHERE user_id = $6 RETURNING *`,
            [first_name, last_name, email, phone_number || null, is_active, userId]
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

module.exports = { getUsers, createUser, updateUser, deleteUser };