
class AppError extends Error {
    constructor(message, status) {
        super();
        this.message;
        this.status;
    }
}

// CATCHING ERRORS FUNCTION

const catchAsync = (fn) => {
    return function (req, res, next) {
        fn(req, res, next).catch((error) => next(error))
    }
}

module.exports = {
    catchAsync,
    AppError
}