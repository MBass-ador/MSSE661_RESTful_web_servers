// ERROR-HANDLING MIDDLEWARE FUNCTIONS


// handle 404 errors
exports.error404 = function (req, res, next) {
    res.send({ message: 'Not Found', status: 404 });
  };
  

// handle  500 errors
  exports.error500 = function (error, req, res, next) {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  };
  
// publish error logger
  exports.logger = function (port) {
    return function () {
      console.log(`running on port: ${port}...`);
    };
  };