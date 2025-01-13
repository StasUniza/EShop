// server/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'tvojtajnykluc';

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('chyba');
        return res.status(401).json({ message: 'Prístup zamietnutý. Neplatný token.' });
        
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        //console.log('Decoded token:', decoded); 
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token je neplatný alebo expirovaný.' });
    }
};


const authenticateAdmin = (req, res, next) => {
    if ( req.user.roleId !== 1) {
        return res.status(403).json({ message: 'Len pre admina.' });
    }
    next();
};

module.exports = {
    authenticate,
    authenticateAdmin
};