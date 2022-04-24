const express = require('express');

const {
    registerUser,
    loginUser
} = require('../controller/authController');
const authRouter = express.Router();



authRouter.route('/register').post(registerUser); //register
authRouter.route('/login').post(loginUser); // login

module.exports = authRouter;

