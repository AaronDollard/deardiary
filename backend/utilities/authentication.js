const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userRegister = async (userDetails, role, res) => {
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
      role,
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

const userLogin = async (userCreds, res) => {
  let { email, password } = userCreds;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "User not found",
      success: false,
    });
  }


  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    let token = jwt.sign(
      {
        username: user.username,
        user_id: user._id,
        role: user.role,
        email: user.email,
      },
      "DearDiary",
      { expiresIn: "1h" }
    );

    let result = {
      token: `Bearer ${token}`,
      expiresIn: 3600,
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
};

const validateUsername = async (username) => {
  let user = await User.findOne({ username });
  return user ? false : true;
};


const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

const checkRole = (roles) => (req, res, next) =>
!roles.includes(req.userData.role)
    ? res.status(401).json("Unauthorized")
    : next();

module.exports = {
  userRegister,
  userLogin,
  checkRole,
};
