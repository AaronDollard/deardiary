const router = require("express").Router();
var User = require("../models/user");
const Countries = require("../models/country");
const checkAuth = require("../utilities/check-auth");

// Bring in the User Registration Function, User Login Function
const {
    userRegister,
    userLogin,
    checkRole
} = require("../utilities/authentication");


// Customer Registration Route
router.post("/register-user", async (req, res) => {
  await userRegister(req.body, "user", res);
});

// Manager  Registration Route
router.post("/register-admin", checkRole(["admin"]), async (req, res) => {
  await userRegister(req.body, "admin", res);
});

/* #region  Login */
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


// Get User Route 
router.get("/user", checkAuth, async (req, res) => {
  console.log("USER IN THE GET USER METHOD", req.user._id.id);
  let id = req.user._id.id;
  getUserEntries(id);
});


async function getUserEntries(req, res, next) {
  const { userId } = req.params;
  const user = await User.findById(userId).populate("countries");
  res.status(200).json(user.countries);
}

async function newUserEntries(req, res, next) {
  const { userId } = req.params;
  const newEntry = new Countries(req.body);
  const user = await User.findById(userId);
  newEntry.customer = user;
  await newEntry.save();
  user.countries.push(newEntry);
  try {
    await user.save();
    res.status(201).json(newEntry);
  } catch (err) {
    return res.status(501).json(err);
  }
}

router.route("/:userId/countries").get(getUserEntries).post(newUserEntries);

module.exports = router;
