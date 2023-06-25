const Mongoose = require('mongoose')
const { Schema } = Mongoose

const unitSchema = new Schema({
    lecturerId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})


const UnitModel = Mongoose.model("Unit", unitSchema);

module.exports = UnitModel


