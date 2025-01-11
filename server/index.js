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
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);





app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
  
});
