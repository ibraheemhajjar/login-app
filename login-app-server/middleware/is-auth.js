const jwt = require("jsonwebtoken");

// authentication middleware by decoding JWT
module.exports = (req, res, next) => {
     let decodedAccessToken;
     try {
          const accessToken = req.get("Authorization")?.split(" ")[1];
          if (!accessToken || accessToken === "null") {
               const error = new Error();
               error.message = "Not Authenticated";
               error.statusCode = 401;
               throw error;
          }
          decodedAccessToken = jwt.verify(accessToken, process.env.JWT_SECRET);
     } catch (err) {
          err.statusCode = 500;
          throw err;
     }
     req.userId = decodedAccessToken.userId;
     req.email = decodedAccessToken.email;
     next();
};
