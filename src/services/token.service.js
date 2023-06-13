const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");
const {users} = require("../models");
const ApiError = require("../exceptions/apiError");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, authConfig.accessTokenKey, {
      expiresIn: authConfig.accessTokenLifeTime,
    });
    const refreshToken = jwt.sign(payload, authConfig.refreshTokenKey, {
      expiresIn: authConfig.refreshTokenLifeTime,
    });
    return {accessToken, refreshToken};
  }

  refreshAccessToken(refreshToken) {
    const decoded = jwt.verify(refreshToken, authConfig.refreshTokenKey);
    const payload = {...decoded};
    const accessToken = jwt.sign(payload, authConfig.accessTokenKey, {
      expiresIn: authConfig.accessTokenLifeTime,
    });
    return {accessToken: accessToken};
  }

  async validateAccessToken(accessToken) {
    let decoded;
    try {
      decoded = jwt.verify(accessToken, authConfig.accessTokenKey);
    } catch (err) {
      console.error("Access token decode error", err);
      throw ApiError.invalidToken();
    }

    const user = await users.findOne({id: decoded.userId});
    if (!user) {
      throw ApiError.userNotExistsError(decoded.userId);
    }
    if (decoded.marker !== user.tokenMarker) {
      throw ApiError.invalidTokenMarker();
    }
    return decoded;
  }
}

module.exports = new TokenService();
