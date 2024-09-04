const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enrollmentSchema = new Schema({
    student: {type: Schema.Types.OjectId, ref:'User', required:true},
    course: {type: Schema.Types.ObjectId, ref:'course', required: true},
    enrolledAt: {type: Date, default: Date.now}
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;