const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = async (req, res, next)=>{
    const token = req.header('auth-token');

    try {
        const { userId, exp } = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (exp < Date.now().valueOf() / 1000){
            return res.status(400).json({
                status:400,
                message:'JWT has expired, Please Login again'
            });
        }else {
            req.userID = userId;
             next()
        }
    } catch (error){
        res.status(500).json({status:500, message:'Invalid token'})
    }
}


const createAccessToken = (userId, email, role) => {
    return jwt.sign({userId, email, role}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d'
    })
}

module.exports = { createAccessToken, authenticate }