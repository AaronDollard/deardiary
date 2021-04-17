const router = require("express").Router();
var User = require("../models/user");
const Country = require("../models/country");
const checkAuth = require("../utilities/check-auth");

const {
    userRegister,
    userLogin,
    checkRole
} = require("../utilities/authentication");

router.post("/register-user", async (req, res) => {
  await userRegister(req.body, "adventurer", res);
});

router.post("/register-admin", checkRole(["admin"]), async (req, res) => {
  await userRegister(req.body, "admin", res);
});

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

router.get("/user", checkAuth, async (req, res) => {
  let id = req.user._id.id;
  getUserEntries(id);
});

async function getUserEntries(req, res, next) {
  const { userId } = req.params;
  const user = await User.findById(userId).populate("country");
  res.status(200).json(user.country);
}

async function newUserEntries(req, res, next) {
  const { userId } = req.params;
  const newEntry = new Country(req.body);
  const user = await User.findById(userId);
  newEntry.adventurer = user;
  await newEntry.save();
  user.country.push(newEntry);
  try {
    await user.save();
    res.status(201).json(newEntry);
  } catch (err) {
    return res.status(501).json(err);
  }
}

router.route("/:userId/country").get(getUserEntries).post(newUserEntries);

module.exports = router;
