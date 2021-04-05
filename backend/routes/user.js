const express = require('express');
const router = express.Router();
const authUser = require('../check-auth')
const jwt = require('jsonwebtoken');
const User = require('../models/userModel')
const config = require('../config');
const bcrypt = require('bcryptjs');



router.post("/register", async (req, res) => {
    await userRegister(req.body, res);
  });
  
const userRegister = async (userDetails, res) => {
    try {
      let usernameNotTaken = await validateUsername(userDetails.username);
      if (!usernameNotTaken) {
        return res.status(400).json({

          message: `Username unavailable.`,
          success: false,
        });
      }
  
      let emailNotRegistered = await validateEmail(userDetails.email);
      if (!emailNotRegistered) {
        return res.status(400).json({
          message: `This email is already associated with a registered account.`,
          success: false,
        });
      }
  
      const password = await bcrypt.hash(userDetails.password, 12); 
  
      const newUser = new User({
        ...userDetails,
        password,
        creation_dt: Date.now(),
      });
  
      await newUser.save();
  
      return res.status(201).json({
        message: "Success! You have successfully registered. Login to continue.",
        success: true,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Unable to create your account.",
        success: false,
      });
    }
  };

const validateUsername = async (username) => {
    let user = await User.findOne({ username });
    return user ? false : true;
  };
  
  const validateEmail = async (email) => {
    let user = await User.findOne({ email });
    return user ? false : true;
  };

  

router.post("/login", async (req, res) => {
    try {
      await userLogin(req.body, res);
    }
    catch (err) {
      return res.status(501).json({
        message: `Login Failure. Account does not exist`,
        success: false,
      });
    }
});

const userLogin = async (currentUser, res) => {
    let { username, password } = currentUser;

    const user = User.findOne({ username });
    if (!user) {
        return res.status(404).json({
            message: "User not found",
            success: false,
        });
    }

    let isMatch = bcrypt.compare(password, user.password);
    if (isMatch) {
        let token = jwt.sign(
            //credentials we pass into the token
            {
                id: user._id,
                username: user.username,
                email: user.email
            },
            config.secret,
            { expiresIn: 604800 }
        );

        let result = {
            token: `Bearer ${token}`,
            expiresIn: 604800, //Seconds
        };

        return res.status(200).json({
            ...result,
            message: "You are now logged in.",
            success: true,
        });
    } else {
        return res.status(403).json({
            message: "Incorrect password.",
            success: false,
        });
    }
}

// Get User Route 
router.get("/user", authUser, async (req, res) => {
    console.log("USER IN THE GET USER METHOD", req.user._id.id);
    let id = req.user._id.id;
    getUserEntries(id);
});
  
async function getUserEntries(req, res, next) {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("countries");
    res.status(200).json(user.countries);
}

//This is a protected route containing the user payload
router.get('/profile', (req, res, next) => {
});


router.post("/login", (req, res) => {
});

module.exports = router;