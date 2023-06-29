const mongoose = require('mongoose')
const { Schema } = mongoose

const attendanceSchema = new Schema({
    lectuerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'lecturer'
    },
    studentId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Student'
    },
    unitId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Unit'
    },
    lessonId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Lesson'
    }

}, {timestamps: true})

const attendanceModel = mongoose.model("Attendance", attendanceSchema)

module.exports = attendanceModel