class ApiError extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.message = message;
    this.status = status;
    this.errors = errors;
  }

  static notAuthorizedError() {
    return new ApiError(401, "User is not authorized");
  }

  static userExistsError(userId) {
    return new ApiError(400, `User ${userId} already exists`);
  }

  static userNotExistsError(userId) {
    return new ApiError(400, `User with ${userId} does not exists`);
  }

  static wrongPassword(userId) {
    throw new ApiError(400, `Password is not correct`);
  }

  static fileNotExistsError(fileId) {
    return new ApiError(400, `File ${fileId} does not exists`);
  }

  static tokenNotExists() {
    throw new ApiError(401, `Unauthorized`);
  }

  static invalidToken() {
    throw new ApiError(400, `Invalid token`);
  }

  static invalidTokenMarker() {
    throw new ApiError(403, `Access denied`);
  }

  static badRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
}

module.exports = ApiError;
