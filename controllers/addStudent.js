const Student = require('../models/studentModel');

const addStudent = async (req, res)=>{
    try{
       const {firstName, lastName, email, phone, gender} = req.body;
        if(!firstName || !lastName || !email || !phone){
            return res.status(400).json({
                Error: "All fields are required"
            })
        }

        const existingStudent = await Student.findOne({email});
        if(existingStudent){
            return res.status(409).json({
                Error: "Student Already Exists"
            })
        }

        const numberOfDocuments = await Student.countDocuments();
        const regNo = `stud-${findRegNo(numberOfDocuments)}`;
        console.log(regNo);

        const student = new Student({
            firstName,
            lastName,
            email,
            registrationNumber: regNo,
            phone,
            gender
        })

        const saveStudent = await student.save();

        return res.status(201).json(saveStudent);
        
    }
    catch(error){
        res.status(400).json({
            error: error.message
        })
    }
}

function findRegNo(number){
    number += 1
    if(number < 10){
        return `000${number}`
    }
    if(number < 100){
        return `00${number}`
    }
    if(number < 1000){
        return `0${number}`
    }

    return number;
}


module.exports = addStudent;