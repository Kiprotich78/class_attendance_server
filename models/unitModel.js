const Mongoose = require('mongoose')
const { schema } = Mongoose

const unitSchema = new schema({
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


