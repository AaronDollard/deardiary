const db = require("../models");
const router = require("express").Router();
const countrycontroller = require("../controllers/countrycontroller");
const checkAuth = require("../utilities/check-auth");



router.route("/").post(checkAuth, countrycontroller.create);
router.route("/getAll").get(checkAuth, countrycontroller.findAll);
router.route("/").get(checkAuth, countrycontroller.findAll);
router.route("/:id").get(checkAuth, countrycontroller.findOne);
router.route("/:id").put(checkAuth, countrycontroller.updateCountry);
router.route("/:id").delete(checkAuth, countrycontroller.deleteCountry);
module.exports = router;