const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    accessToken: { type: String },
    role:{type: String, enum: ['instructor', 'student'], required: true}
});

const User = mongoose.model('User', userSchema);

module.exports = User;