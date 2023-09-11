const resHandler = require("../middleware/res-handler");

const privateController = {};

privateController.getPrivateData = async (req, res, next) => {
     res.executedSuccessfully = true;
     res.message = "Successfully! got private data";
     res.statusCode = 200;
     res.data = "your private data";
     res.error = null;
     resHandler(null, req, res, next);
};

module.exports = privateController;
