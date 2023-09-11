const resHandler = (error, req, res, next) => {
     return res.json({
          executedSuccessfully: res.executedSuccessfully,
          message: res.message,
          statusCode: res.statusCode,
          data: res.data,
          error: null,
     });
};

module.exports = resHandler;
