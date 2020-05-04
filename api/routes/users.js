const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport")
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './client/avatars')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + ".jpg")
    }
  })
const upload = multer({dest: "avatars/", storage: storage})

//user model

const User = require("../models/User");

//auth middleware
require("../controllers/auth");
const authMiddleware = passport.authenticate('jwt', { session : false, failureRedirect: '/users/login', });

// login page
router.get("/login", (req, res) => {
    res.render("login.ejs")
});

router.post("/login", (req, res) => {
    const { email, password } = req.body
    User.findOne({email, password}, (err, success) => {
        if (!success) {
            res.status(401).json({ success: false }); 
        } else {
            const token = jwt.sign({
                id: success._id
            }, "secretApiKey",
             {expiresIn: "5h"})
            res.status(202).json({
                success: true,
                token: token
            })
        }
        
    })
})

router.get("/all", authMiddleware, (req, res) => {
    User.find({}, (err, users) => {
        const usersArray = []
        users.forEach(element => {
            const filteredUser = {
                Name: element.firstName + " " + element.lastName,
                Age: element.age,
                About: element.about, 
                Avatar: element.avatar
            };
            usersArray.push(filteredUser)
        })
        res.json({
            Users: usersArray
        })
    })
})

router.get("/myprofile", authMiddleware, (req, res) => {
    User.find({email: req.user.email}, (err, user) => {
        res.json(user)
    })
})


router.get("/register", (req, res) => {
    res.render("register.ejs")
})

router.post("/register", upload.single('avatar'), (req, res) => {
    const { firstName, lastName, password, email, age, about } = req.body;
    console.log(req.body)
    if (firstName && lastName && password && email && age && about) {
        const newUser = new User({
            firstName,
            lastName,
            password,
            email,
            age,
            about,
            avatar: req.file.filename
        });
        User.findOne({email: email}, (err, user) => {
            if (user) {
                return res.send(`User with ${email} already exists.`)
            } else {
                newUser.save()
        .then(user => {
            res.send(user)
        })
        .catch(err => console.log(err))
            }
        })
        
    } else {
        res.send("Needs: firstName, lastName, password, email, age, about and avatar")
    }
})


module.exports = router;