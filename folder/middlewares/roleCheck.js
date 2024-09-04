const jwt = require('jsonwebtoken');
//const authenticate = require('../folder/middlewares/token')
require('dotenv').config();

//verify role
const verifyRole = (...roles)=>{
    return (req, res, next)=> {
        const token = req.header('auth-token');
        if(!token) {
            return res.status(403).json({message:"Access denied"})
        }

        try{
            const {userId, role } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            if(!roles.includes(role)) {
                return res.status(403).json({message:'You do not have Access to this resource'})
            }
            req.user = { userId, role };
            next();
        } catch(err){
            return res.status(401).json({message:"Invalid Token"});
        }
    }
}

const roleCheck = (roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Permission Denied' });
      }
      next();
    };
  };
  
  module.exports = { verifyRole, roleCheck}
  