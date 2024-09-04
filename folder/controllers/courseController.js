const Course = require('../models/courseSchema');


module.exports = {
     createCourse: async (req, res, next)=> {

    const { title, courseCode } = req.body;
    const instructorId = req.user.userId;

    try{
        const course = new Course({
            title,
            courseCode,
            instructor: instructorId
        });
        await course.save();

        res.status(201).json({message:'Course created successfully'})
    } catch (error) {
        res.status(500).json({message:"Ensure creating course", error})
    }
},


// view a specific course (Accessible to both students and instructors)
getCourse: async (req, res, next) => {
    const { id } = req.params;

    try {
        const course = await Course.findById(id).populate('instructor', 'username email');
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({ message: 'Course retrieved successfully', course });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving course', error });
    }
},

// Update a course (Instructor only)
updateCourse: async (req, res, next) => {
    const { id } = req.params;
    const { title, courseCode } = req.body;

    try {
        const course = await Course.findByIdAndUpdate(
            id,
            { title, courseCode },
            { new: true }
        );

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({ message: 'Course updated successfully', course });
    } catch (error) {
        res.status(500).json({ message: 'Error updating course', error });
    }
},

// Delete a course (Instructor only)
deleteCourse: async (req, res, next) => {
    const { id } = req.params;

    try {
        const course = await Course.findByIdAndDelete(id);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting course', error });
    }
  }

}