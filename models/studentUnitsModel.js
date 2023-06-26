const mongoose = require('mongoose');

const studentUnitSchema = new mongoose.Schema({
  student: {
    type: String,
    ref: 'Student',
    required: true
  },
  unit: {
    type: String,
    ref: 'Unit',
    required: true
  }
});

const StudentUnit = mongoose.model('StudentUnit', studentUnitSchema);

module.exports = StudentUnit;
