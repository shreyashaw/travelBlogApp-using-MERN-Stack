const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');

//CREATE POST
exports.createPost = async (req, res) => {
    try {
        const newPost = await Post.create({
            username: req.body.username,
            title: req.body.title,
            places_visited: req.body.places_visited,
            time_taken: req.body.time_taken,
            description: req.body.description,
            travle_cost: req.body.travle_cost,
            photos: req.body.photos,
        });
        res.status(201).json({
            success: true,
            message: 'post added successfully',
            newPost
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


//GET ALL POSTS
exports.getAllPost = async (req, res) => {
    try{
        const allPosts = await Post.find({});
        res.status(200).json({
            success: true,
            message: 'all posts retrieved successfully',
            allPosts
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
        success: false,
        message: 'Internal server error',
        });
    }
};


//GET POSTS BY ID
exports.getPostById = async (req, res) => {
    try{
        const findPost = await Post.findById(req.params.id);
        if (findPost) {
            res.status(200).json({
              success: true,
              message: 'Post found',
              findPost
            });
        }
        else {
            res.status(404).json({
              success: false,
              message: 'Post not found',
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({
        success: false,
        message: 'Internal server error',
        });
    }
};


//UPDATE POSTS BY ID
exports.updatePost = async (req, res) => {
    try{
        const findPost = await Post.findById(req.params.id);
        if(findPost){
            if(findPost.username === req.body.username){
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    {new : true}
                );
                res.status(201).json({
                    success: true,
                    message: 'updated user successfully',
                    updatedPost
                });
            }
            else{
                res.status(401).json("You can update only your posts!");
            }
        }
        else{
            res.status(404).json({
                success: false,
                message: 'Post not found',
              });
        } 
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success: true,
            message: 'Internal server error',
        });
    }
};



//DELETE POSTS BY ID
exports.deletePost = async (req, res) => {
    try{
        const findPost = await Post.findById(req.params.id);
        if(findPost){
            if(findPost.username === req.body.username){
                const deletedPost = await Post.findByIdAndDelete(req.params.id);
                res.status(201).json({
                    success: true,
                    message: 'deleed user successfully',
                    deletedPost
                });
            }
            else{
                res.status(401).json("You can delete only your posts!");
            }
        }
        else{
            res.status(404).json({
                success: false,
                message: 'Post not found',
              });
        } 
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success: true,
            message: 'Internal server error',
        });
    }
};
