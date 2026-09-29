class AppError extends Error {
    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = {
    AppError
}

// const asyncHandler = (fn) => {
//     return (req, res, next) => {
//         Promise.resolve(fn(req, res, next)).catch((error)=>{
//             console.log("Async Handler Error: ", error);
//             console.log("Stack: ", error.stack);

//             next(error);
//         })
//     }
// }