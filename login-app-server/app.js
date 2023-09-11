//package imports
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

//local imports
const authRoutes = require("./routes/auth");
const privateRoutes = require("./routes/private-route");
const logger = require("./utils/logger");
const errorHandler = require("./middleware/error-handler");

//environment variables
const port = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

//main application
const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
     res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
     res.setHeader("Access-Control-Allow-Headers", "Content-Type", "Authorization");
     next();
});

//routes
app.use("/auth", authRoutes);
app.use("/private", privateRoutes);

// error handler
app.use(errorHandler);

//database connection
mongoose.set("strictQuery", false);
mongoose.connect(DB_URI, () => {
     logger.info("database connected successfully!");

     app.listen(port, () => {
          logger.info(`server started at port: ${port}`);
     });
});
