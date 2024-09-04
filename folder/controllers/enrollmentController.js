const Enrollment = require('../models/enrollmentSchema');
const Course = require('../models/courseSchema');


module.exports = {
    
// Enroll a student in a course
    enroll: async (req, res, next)=>{

        try {
            const { courseCode } = req.body;
            const studentId = req.user._id;

            const course = await Course.findById(courseCode);

            //check if the course is full
            if (course.enrollment >= course.capacity) {
                return res.student(400).json({message: 'Course is full. Enrollment not possible'});
            }
        
            // Check if already enrolled
            const existingEnrollment = await Enrollment.findOne({ student: studentId, course: courseCode });
            if (existingEnrollment) {
              return res.status(400).json({ message: 'Already enrolled in this course' });
            }
        
            const enrollment = new Enrollment({ student: studentId, course: courseCode });
            await enrollment.save();

            course.enrollment += 1;
            await course.save();
            
            res.status(201).json({ message: 'Enrolled successfully', enrollment });
          } catch (error) {
            res.status(500).json({ error: 'Failed to enroll' });
          }
    },
  

// Get all courses a student is enrolled in
myCourses: async (req, res) => {try {
    const studentId = req.user._id;
    const enrollments = await Enrollment.find({ student: studentId }).populate('course');

    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve courses' });
  }
},
  
// Unenroll from a course
 unenroll: async (req, res) => {try {
    const studentId = req.user._id;
    const { courseCode } = req.params;

    const enrollment = await Enrollment.findOneAndDelete({ student: studentId, course: courseCode });
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    //Decrease enrolled count
    const course = await Course.findById(courseId);
    course.enrollment -+ 1;
    await course.save();

    res.status(200).json({ message: 'Unenrolled successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to unenroll' });
  }
}
  
}
