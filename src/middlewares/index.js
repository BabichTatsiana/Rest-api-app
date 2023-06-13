const {err} = require("../utils");

module.exports = {
    errorHandler: require("./errorHandlerMiddleware"),
    notFound: err(require("./notFoundMiddleware")),
    fileUpload: err(require("./fileUploadMiddleware")),
    authorization: err(require("./authorizationMiddleware")),
};
