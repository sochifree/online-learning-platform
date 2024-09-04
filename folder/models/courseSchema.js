const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title: { type: String, required: true },
    courseCode: { type: String, required: true },
    instructor: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // Refers to the instructor who created the course
    capacity: { type: Number, required: true},
    enrollment: { type: Number, default:0},
    students: [{ type: Schema.Types.ObjectId, ref: 'User' }],  // List of enrolled students
    createdAt: { type: Date, default: Date.now }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
