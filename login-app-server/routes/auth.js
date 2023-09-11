const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controllers");
const { loginValidationRules, validate, signupValidationRules } = require("../middleware/validator");

// auth routes
router.post("/login", loginValidationRules(), validate, authControllers.postLogin);
router.get("/refresh", authControllers.refreshToken);
router.post("/signup", signupValidationRules(), validate, authControllers.postSignup);
router.get("/sign-out", authControllers.getSignOut);

module.exports = router;
