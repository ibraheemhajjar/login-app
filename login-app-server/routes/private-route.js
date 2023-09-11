const express = require("express");
const router = express.Router();
const privateController = require("../controllers/private-controller");
const isAuth = require("../middleware/is-auth");

// auth routes
router.get("/private1", isAuth, privateController.getPrivateData);

module.exports = router;
