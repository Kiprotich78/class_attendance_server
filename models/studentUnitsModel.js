const mongoose = require('mongoose');

const studentUnitSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit',
    required: true
  }
});

const StudentUnit = mongoose.model('StudentUnit', studentUnitSchema);

module.exports = StudentUnit;
