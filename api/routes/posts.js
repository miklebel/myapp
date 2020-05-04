const express = require("express");
const router = express.Router();

//auth middleware
const passport = require("passport");
require("../controllers/auth");

//posts model 
const Post = require("../models/Post");

const authMiddleware = passport.authenticate('jwt', { session : false, failureRedirect: '/users/login', });


router.post("/myposts", authMiddleware, (req, res) => {
    const postText = req.body.postText;
    const newPost = new Post({
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        postText: postText,
        creatorId: req.user._id
    });
    newPost.save()
    .then(post => {
        res.status(201).send(post)
    })
    .catch(err => console.log(err))
});

router.get('/', (req, res) => {
    res.render("posts.ejs")
})

router.get("/allposts", authMiddleware, (req, res) => {
    Post.find({}, (err, posts) => {
        res.json({
            posts: posts
        })
    })
})

router.get("/myposts", authMiddleware, (req, res) => {
    Post.find({creatorId: req.user._id}, (err, posts) => {
        res.json({
            myposts: posts
        })
    })
})

router.put("/myposts", authMiddleware, (req, res) => {
    Post.findOneAndUpdate({_id: req.body.postId, creatorId: req.user._id}, {postText: req.body.postText}, (err, post) => {
        if (post) {
            res.send(req.body.postText)
        } else {
            res.status(404).send("post not found")
        }
        
    })
})

router.delete("/myposts", authMiddleware, (req, res) => {
    Post.findByIdAndDelete(req.body.postId, (err, post)=> {
        if (post) {
            res.status(200).send("deleted")
        } else {
            res.status(404).send("doesn't exist")
        }        
    })
})

module.exports = router;