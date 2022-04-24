const express = require('express');

const {
    createPost,
    getAllPost,
    getPostById,
    updatePost,
    deletePost,
} = require('../controller/postController');
const postRouter = express.Router();


postRouter.route('/create').post(createPost);
postRouter.route('/get').get(getAllPost);
postRouter.route('/get/:id').get(getPostById);
postRouter.route('/update/:id').put(updatePost);
postRouter.route('/delete/:id').delete(deletePost);

module.exports = postRouter;