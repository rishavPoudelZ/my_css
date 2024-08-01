const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds for bcrypt

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

const hashPassword = async (plainTextPassword) => {
    try {
        const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
        return hashedPassword;
    } catch (err) {
        console.error('Error hashing password:', err);
    }
};

const comparePassword = async (plainTextPassword, hashedPassword) => {
    try {
        const match = await bcrypt.compare(plainTextPassword, hashedPassword);
        return match; // true if passwords match, false otherwise
    } catch (err) {
        console.error('Error comparing password:', err);
    }
};

const generateAccessToken = (user) => {     // Generate an access token
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
};

module.exports = {
    authenticateToken,
    hashPassword,
    comparePassword,
    generateAccessToken
};
