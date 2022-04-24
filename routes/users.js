const express = require('express');

const {
    updateUser,
    deleteUser
} = require('../controller/userController');
const userRouter = express.Router();


userRouter.route('/update/:id').put(updateUser);
userRouter.route('/delete/:id').put(deleteUser);

module.exports = userRouter;