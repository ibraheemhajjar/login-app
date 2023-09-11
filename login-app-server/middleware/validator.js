const { check, validationResult } = require("express-validator");

const loginValidationRules = () => {
     return [
          check("email").notEmpty().withMessage("Email should not be empty").bail().isEmail().withMessage("Invalid email").bail(),
          check("password")
               .notEmpty()
               .withMessage("Password should not be empty")
               .bail()
               .isLength({ min: 7 })
               .withMessage("Password must be at least 7 characters long")
               .bail()
               .matches("[0-9]")
               .withMessage("Password must contain a number, uppercase and lowercase")
               .bail()
               .matches("[A-Z]")
               .withMessage("Password must contain a number, uppercase and lowercase")
               .bail()
               .matches("[a-z]")
               .withMessage("Password must contain a number, uppercase and lowercase")
               .bail(),
     ];
};

const signupValidationRules = () => {
     return [
          check("email").notEmpty().withMessage("Email should not be empty").bail().isEmail().withMessage("Invalid email").bail(),
          check("password")
               .notEmpty()
               .withMessage("Password should not be empty")
               .bail()
               .isLength({ min: 7 })
               .withMessage("Password must be at least 7 characters long")
               .bail()
               .matches("[0-9]")
               .withMessage("Password must contain a number, uppercase and lowercase")
               .bail()
               .matches("[A-Z]")
               .withMessage("Password must contain a number, uppercase and lowercase")
               .bail()
               .matches("[a-z]")
               .withMessage("Password must contain a number, uppercase and lowercase")
               .bail()
               .custom((val, { req }) => {
                    if (val === req.body.confirmPassword) {
                         return true;
                    } else {
                         return false;
                    }
               })
               .withMessage("Passwords do not match"),
     ];
};

const validate = (req, res, next) => {
     const errors = validationResult(req);
     if (errors.isEmpty()) {
          return next();
     }
     const extractedErrors = [];
     errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
     const error = new Error();
     error.message = extractedErrors;
     error.statusCode = 422;
     console.log(error);
     throw error;
};

module.exports = { loginValidationRules, signupValidationRules, validate };
