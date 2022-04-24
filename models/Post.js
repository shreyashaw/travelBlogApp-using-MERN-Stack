const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
     },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    places_visited: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    time_taken: {
        type: String,
        required: false,
    },
    travle_cost: {
        type: String,
        required: false,
    },
    photos: {
        type: String,
        required: false,
    },
},{timestamp: true}
);

module.exports = mongoose.model('Post', postSchema); // collection name is user