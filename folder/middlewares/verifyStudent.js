const { verify } = require('jsonwebtoken')
const User = require('../models/user');

const verifyToken = (req, res, next) => {
    const token = req.header('Auth-header');
    if (!token) return res.status(401).json({message:"Access denied"})

    try{
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({message:'Invalid token'})
    }
};

const isStudent = (req, res, next)=>{
    if (req.user.role !=='student') {
        return res.status(403).json({message:'Access denied. Only students are allowed'})
    }
    next()
};

module.exports = { verifyToken, isStudent}

