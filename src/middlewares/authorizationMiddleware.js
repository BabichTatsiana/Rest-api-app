const tokenService = require("../services/token.service");
const ApiError = require("../exceptions/apiError");

const authorization = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    throw ApiError.tokenNotExists();
  }
  const token = authHeader.split(" ")[1];

  req.user = await tokenService.validateAccessToken(token);
  next();
};

module.exports = authorization;
