/* server/index.js */



const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); 
const cors = require('cors');
const pool = require('./config/db');
const bcrypt = require('bcrypt');
const { deleteUser } = require('./controllers/userController');





const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Server is running!');
});

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
/*
const createTestUser = async () => {
    try {
        const email = 'test.user1@example.com';
        const role_id = 2;
        const first_name = 'Test';
        const last_name = 'User';
        const password = 'securepassword';
        const phone_number = '123456789';

        
        const emailCheck = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
        if (emailCheck.rowCount > 0) {
            console.log('Testovací používateľ už existuje.');
            return;
        }

        
        console.log('Pred hashovaním hesla:', password);
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Po hashovaní hesla:', hashedPassword);
        

       
        const result = await pool.query(
            `INSERT INTO Users (role_id, first_name, last_name, email, password, phone_number, date_joined, is_active)
             VALUES ($1, $2, $3, $4, $5, $6, NOW(), TRUE) RETURNING *`,
            [role_id, first_name, last_name, email, hashedPassword, phone_number]
        );

        console.log('Testovací používateľ bol úspešne vytvorený:', result.rows[0]);
    } catch (err) {
        console.error('Chyba pri vytváraní testovacieho používateľa:', err.message);
    }
};*/


app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
   /* await createTestUser(); */


/*
    const mockReq = {
        params: { user_id: 7 }, // Simulované ID používateľa
    };

    const mockRes = {
        status: (statusCode) => {
            console.log(`HTTP Status: ${statusCode}`);
            return mockRes;
        },
        json: (data) => {
            console.log('Response Data:', data);
        },
    };

    try {
        await deleteUser(mockReq, mockRes); // Zavolanie deleteUser
    } catch (err) {
        console.error('Chyba pri odstraňovaní používateľa:', err.message);
    }

    */
});
