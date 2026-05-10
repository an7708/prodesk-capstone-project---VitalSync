const errorHandler = (err, req, res, next) => {
console.error(err.stack);

let statusCode = err.statusCode || err.status || 500;
let message = err.message || 'Internal Server Error';

// Mongoose CastError — invalid MongoDB ID
if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ID format for field: ${err.path}`;
}

// Mongoose ValidationError
if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map((e) => e.message).join(', ');
}

// MongoDB duplicate key
if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `An account with this ${field} already exists`;
}

// JWT errors
if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token. Please log in again.';
}

if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Your session has expired. Please log in again.';
}

res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
});
};

module.exports = errorHandler;



















//     // const errorHandler = (err, req, res, next) => {
//     // const errorHandler = (err, req, res, next) => {
//     //     logger.error('Unhandled error', {
//     //         message: err.message,
//     //         url: req.originalUrl,
//     //         method: req.method,
//     //     });
//     const errorHandler = (err, req, res, next) => {
//         console.error(err.stack);
//         const statusCode = err.statusCode || err.status || 500;
//         res.status(statusCode).json({
//             success: false,
//             message: err.message || 'Internal Server Error',
//         });
//     };

// module.exports = errorHandler;

//     // let statusCode = err.statusCode || 500;
//     // let message = err.message || 'Internal server error';

//     // Mongoose CastError — someone passed an invalid MongoDB ID
//     if (err.name === 'CastError') {
//         statusCode = 400;
//         message = `Invalid ID format for field: ${err.path}`;
//     }

//     // Mongoose ValidationError — schema validation failed
//     if (err.name === 'ValidationError') {
//         statusCode = 400;
//         message = Object.values(err.errors).map((e) => e.message).join(', ');
//     }

//     // MongoDB duplicate key — e.g. email already exists
//     if (err.code === 11000) {
//         statusCode = 400;
//         const field = Object.keys(err.keyValue)[0];
//         message = `An account with this ${field} already exists`;
//     }

//     // JWT errors
//     if (err.name === 'JsonWebTokenError') {
//         statusCode = 401;
//         message = 'Invalid token. Please log in again.';
//     }

//     if (err.name === 'TokenExpiredError') {
//         statusCode = 401;
//         message = 'Your session has expired. Please log in again.';
//     }

//     res.status(statusCode).json({
//         success: false,
//         status: statusCode,
//         message,
//         ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
//     });
    

//     //module.exports = errorHandler;