const studentModel = require('../models/studentModel');

const getAllStudents = async (req, res)=>{
    const lecturerId = req.body.lecturerId;

    try{
        const students = await studentModel.find({lecturerId});
        res.status(200).json({
            total: students.length,
            students
        });
    }
    catch(error){
        res.status(500).json({Error: "Internal Server Error"});
    }
}


module.exports = getAllStudents;