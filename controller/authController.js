const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');



//REGISTER
exports.registerUser =async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const user = await User.create({
            username: req.body.username,
            gmail: req.body.gmail,
            password: hashedPass
        });
        res.status(201).json({
            success: true,
            message: 'user added successfully',
            user
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
        success: false,
        message: 'Internal server error',
        });
    }
};




//LOGIN
exports.loginUser =async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});

        if(user){
            const validated = await bcrypt.compare(req.body.password, user.password);

            if(validated){
                res.status(201).json({
                success: true,
                message: 'user found successfully'
                });
            }
            else{
                res.status(400).json({
                    success: false,
                    message: 'Wrong password!'
                });
            }
        }
        else{
            res.status(400).json({
                success: false,
                message: 'Wrong username!',
            });
        }    
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
        success: false,
        message: 'Internal server error',
        });
    }
};
