const Student = require('../../models/studentModel');

const addStudent = async (req, res)=>{
    try{
       const {lecturerId, firstName, lastName, email, phone, gender} = req.body;
        if(!firstName || !lastName || !email || !phone){
            return res.status(400).json({
                Error: "All fields are required"
            })
        }

        const students = await Student.find({email});

        if (students.some((student) => student.lecturerId === lecturerId)) {
            return res.status(409).json({
              Error: "Student Already Exists",
            });
        }
        
        const numberOfDocuments = await Student.countDocuments({lecturerId});
        const regNo = `stud-${findRegNo(numberOfDocuments)}`;

        const student = new Student({
            lecturerId,
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