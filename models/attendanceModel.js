const mongoose = require('mongoose')
const { Schema } = mongoose

const attendanceSchema = new Schema({
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

})

const attendanceModel = mongoose.model("Attendance", attendanceSchema)

module.exports = attendanceModel