const express = require('express');
const { signup, login } = require('../controllers/userController')

const { authenticate } = require('../middlewares/token');
const { roleCheck, verifyRole} = require('../middlewares/roleCheck');

const router = express.Router();

//Signup Route
router.post('/signup', signup)

//Login Route 
router.post('/login', login)

//Route accessible to bot instructor and students
router.get('/dashboard', authenticate, (req, res)=>{
    res.status(200).json({message: `Welcome ${req.user.role}`})
})

//Route accessible to instructors only
router.get('/instructor', authenticate, roleCheck(['instructor']), verifyRole, (req, res)=>{
    res.status(200).json({message:'Welcome Instructor'})
});

//Route accessible to students only
router.get('/students', authenticate, roleCheck(['student']), verifyRole, (req, res)=>{
    res.status(200).json({message:'Welcome Student'})
});

module.exports = router;