class APIError extends Error {
    constructor(status = 500, message) {
        super(message);
        this.status = status;
    }

    static notFound = (message) =>{
        return new this(404, message || "Not Found");
    }

    static badRequest = (message) =>{
        return new this(400, message || "Bast Request");
    }

    static unAuthorized = (message) =>{
        return new this(401, message || "You are not allowed to access this route");
    }

    static unAuthenticated = (message) =>{
        return new this(403, message || "You need to Login First");
    }

    static customeError = (message) =>{
        return new this(message || "Unknown Error has occurres");
    }
}

const notFound =(req, res, next)=>{
    const error = new Error("Route not found");
    error.status = 404;
    next(error);
}

const errorHandler = (error, req, res, next) =>{
    res.status(error.status || 500).json({Error: error.message || "Unknown Error has occured"});
}

module.exports = {
    APIError,
    notFound,
    errorHandler
}