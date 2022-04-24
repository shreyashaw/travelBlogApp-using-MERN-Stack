const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');



//UPDATE
exports.updateUser = async (req, res) => {
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new : true}
            );
            res.status(201).json({
                success: true,
                message: 'updated user successfully',
                updatedUser
            });
        }
        catch(error){
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    else{
        res.status(401).json("You can update only your account, wrong username!");
    }
}




//DELETE
exports.deleteUser = async (req, res) => {
    if(req.body.userId === req.params.id){
        try{
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            res.status(201).json({
                success: true,
                message: 'deleted user successfully',
                deletedUser
            });
        }
        catch(error){
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    else{
        res.status(401).json("You can delete only your account, wrong username!");
    }
}