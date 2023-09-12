const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const resHandler = require("../middleware/res-handler");

const authControllers = {};

authControllers.postLogin = async (req, res, next) => {
     const { email, password } = req.body;
     try {
          // finding user in database
          const user = await User.findOne({ email });
          if (!user) {
               const error = new Error();
               error.message = "user email is not found";
               error.statusCode = 401;
               return next(error);
          }
          // comparing password
          const valid = await bcrypt.compare(password, user.password);
          if (!valid) {
               const error = new Error();
               error.message = "wrong password";
               error.statusCode = 401;
               return next(error);
          }
          // generating tokens
          const accessToken = jwt.sign({ email: email, userId: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: "15s" });
          const refreshToken = jwt.sign({ email: email, userId: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: "14d" });
          // sending response
          res.executedSuccessfully = true;
          res.message = "Successfully! logged In";
          res.statusCode = 201;
          res.data = {
               accessToken: accessToken,
               refreshToken: refreshToken,
          };
          res.error = null;
          resHandler(null, req, res, next);
     } catch (err) {
          throw err;
     }
};

authControllers.refreshToken = async (req, res, next) => {
     let newAccessToken;
     try {
          const AuthRefreshToken = req.get("Authorization")?.split(" ")[1];
          console.log(AuthRefreshToken);
          if (!AuthRefreshToken || AuthRefreshToken === "null") {
               const error = new Error();
               error.message = "Not Authenticated";
               error.statusCode = 401;
               return next(error);
          }
          decodedRefreshToken = jwt.verify(AuthRefreshToken, process.env.JWT_SECRET);
          newAccessToken = jwt.sign({ email: decodedRefreshToken.email, userId: decodedRefreshToken.userId }, process.env.JWT_SECRET, {
               expiresIn: "15s",
          });
     } catch (err) {
          err.statusCode = 500;
          throw err;
     }
     res.executedSuccessfully = true;
     res.message = "generated new access token successfully!";
     res.data = newAccessToken;
     res.statusCode = 200;
     resHandler(null, req, res, next);
};

authControllers.postSignup = async (req, res, next) => {
     const { email, password, confirmPassword } = req.body;
     try {
          if (password !== confirmPassword) {
               const error = new Error();
               error.message = "passwords do not match";
               error.statusCode = 400;
               return next(error);
          }
          const user = await User.findOne({ email });
          if (user) {
               const error = new Error();
               error.message = "email already used";
               error.statusCode = 400;
               return next(error);
          }
          const passwordHash = await bcrypt.hash(password, 12);
          const newUser = await User.create({
               email,
               password: passwordHash,
          });
          if (!newUser) {
               const error = new Error();
               error.message = "failed to create user";
               error.statusCode = 500;
               return next(error);
          }
          res.executedSuccessfully = true;
          res.message = "created successfully!";
          res.data = newUser;
          res.statusCode = 201;
          resHandler(null, req, res, next);
     } catch (err) {
          throw err;
     }
};

module.exports = authControllers;
