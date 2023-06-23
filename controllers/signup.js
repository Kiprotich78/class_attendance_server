const Mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Lecturer = require('../models/lecturerModel');

const signup =async (req, res)=>{
    try{
        const {firstName, lastName, email, password} = req.body;

        const existingUser = await Lecturer.findOne({email});

        if(existingUser){
            return res.status(409).json({Error: "User Already Exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new Lecturer({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        })

        const addUser = await user.save()
        console.log(addUser);
        res.status(201).json( {
            message: 'User created successfully',
            user: {
                firstName,
                lastName,
                email,
            },
        });

    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = signup;
