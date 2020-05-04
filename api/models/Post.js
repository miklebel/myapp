const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    postText: {
        type: String,
        required: true
    },
    creatorId: {
        type: String,
        required: true
    },
    timeCreated: {
        type: Date,
        default: Date.now
    }
})

const Post = mongoose.model("Post", PostsSchema);

module.exports = Post;