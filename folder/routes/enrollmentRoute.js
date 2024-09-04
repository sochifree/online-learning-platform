const express = require('express');
const { verifyToken, isStudent } = require('../middlewares/verifyStudent');

const { enroll, myCourses, unenroll } = require('../controllers/enrollmentController')

const router = express.Router()
router.post('/enroll', verifyToken, isStudent, enroll)

router.get('/my-courses', verifyToken, isStudent, myCourses)

router.delete('/unenroll/:courseId', verifyToken, isStudent, unenroll)

module.exports = router;