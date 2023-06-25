const Mongoose = require("mongoose")
const {Schema} = Mongoose

const lessonSchema  = new Schema({
    lessonName: {
        type: String,
        required: true
      },
    unitID: {
        type: String,
        required: true
    },
    lecturerID: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
})


const LessonModel = Mongoose.model("Lesson", lessonSchema)

module.exports = LessonModel