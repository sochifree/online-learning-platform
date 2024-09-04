const express = require('express');
const { authenticate } = require('../middlewares/token');
const {roleCheck, verifyRole} = require('../middlewares/roleCheck');

const { createCourse, getCourse, updateCourse, deleteCourse } = require('../controllers/courseController')

const router = express.Router();

router.post('/create', authenticate, roleCheck(['instructor']), verifyRole, createCourse)

router.get('/courses/:id', authenticate, getCourse)

router.put('/courses/:id', authenticate, roleCheck(['instructor']), verifyRole, updateCourse)

router.delete('/courses/:id', authenticate, roleCheck(['instructor']), verifyRole, deleteCourse)

module.exports = router
