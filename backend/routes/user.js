const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel')
const config = require('../config');

router.post("/register", (req, res) => {
    let newUser = new User ({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })

    User.addUser(newUser, (err, user) =>{
        if(err){
            res.json({success: false, msg:'Failed to register'})
        }
        else {
            res.json({success: true, msg:'User registered'})
        }
    })
});

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) =>{
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not found'})
        }

        User.comparePassword(password, user.password, (err, isMatch) =>{
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 604800
                });

                //JWT Payload for loggin in success
                res.json({
                    success: true, 
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email
                    }
                })
            } else {
                return res.json({success: false, msg: 'Incorrect login details entered'});
            }
        })
    })
});

//This is a protected route containing the user payload
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user})
});


router.post("/login", (req, res) => {
});

module.exports = router;