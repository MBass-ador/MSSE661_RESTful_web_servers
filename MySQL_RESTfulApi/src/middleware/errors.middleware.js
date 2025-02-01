// Error-Handling Middleware

// handle 404 errors
exports.error404 = (req, res, next) => {
    next ({ message: 'Resource Not Found', status: 404 });
};

// handle 500 errors
exports.error500 = (error, req, res, next) => {    
    res.status(error.status || 500);
    res.json ({
        error: {
            message: error.message
        }
    });
};