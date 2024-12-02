const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // Import PostgreSQL Pool
require('dotenv').config(); // Načítanie `.env` súboru

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Test pripojenia k databáze
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Database connected:', res.rows[0]);
    }
});

// Spustenie servera
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


// Endpoint na načítanie kategórií
app.get('/api/categories', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Category');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
