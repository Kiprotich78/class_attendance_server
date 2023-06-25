const Mongoose = require('mongoose');
const { Schema } = Mongoose;

const studentSchema = new Schema({
    lecturerId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    registrationNumber: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        maxlength: 100,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    phone: {
        type: Number,
        required: true,
        min: 1000000000,
        max: 9999999999
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        default: 'Other'
    }
});

const StudentModel = Mongoose.model('Student', studentSchema);

module.exports = StudentModel;
