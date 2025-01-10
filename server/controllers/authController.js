// server/controllers/authController.js

const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const JWT_SECRET = 'tvojtajnykluc'; 


const registerUser = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ message: 'Všetky polia sú povinné.' });
    }

    try {
        
        const emailCheck = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
        if (emailCheck.rowCount > 0) {
            return res.status(400).json({ message: 'E-mail už existuje.' });
        }

        
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

       
        const newUser = await pool.query(
            `INSERT INTO Users (role_id, first_name, last_name, email, password, date_joined, is_active)
             VALUES (2, $1, $2, $3, $4, NOW(), TRUE) RETURNING *`,
            [first_name, last_name, email, hashedPassword]
        );

        res.status(201).json({ message: 'Používateľ úspešne registrovaný.', user: newUser.rows[0] });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Interná chyba servera.' });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'E-mail a heslo sú povinné.' });
    }

    try {
       
        const user = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
        if (user.rowCount === 0) {
            return res.status(401).json({ message: 'Nesprávne prihlasovacie údaje.' });
        }

        
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Nesprávne heslo.' });
        }

        
        const token = jwt.sign({ userId: user.rows[0].user_id, roleId: user.rows[0].role_id }, JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token, user: { ...user.rows[0], password: undefined } });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Interná chyba servera.' });
    }
};


const verifyToken = (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Prístup zamietnutý. Neplatný token.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.status(200).json({ userId: decoded.userId, roleId: decoded.roleId });
    } catch (error) {
        res.status(401).json({ message: 'Token je neplatný alebo expirovaný.' });
    }
};

module.exports = { registerUser, loginUser, verifyToken };
