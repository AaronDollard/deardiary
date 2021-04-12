const db = require("../models");
const router = require("express").Router();
const countrycontroller = require("../controllers/countrycontroller");
const checkAuth = require("../utilities/check-auth");



router.route("/").post(checkAuth, countrycontroller.create);
router.route("/getAll").get(countrycontroller.findAll);
router.route("/").get(checkAuth, countrycontroller.findAll);
router.route("/:id").get(countrycontroller.findOne);
router.route("/:id").put(countrycontroller.updateCountry);
router.route("/:id").delete(countrycontroller.deleteCountry);
module.exports = router;