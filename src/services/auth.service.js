const bcrypt = require("bcrypt");
const authConfig = require("../config/auth.config");
const tokenService = require("./token.service");
const { users } = require("../models/index");
const ApiError = require("../exceptions/apiError");

class AuthService {
  async register({ userId, password }) {
    let user = await users.findOne({
      where: {
        id: userId,
      },
    });
    if (user) {
      throw ApiError.userExistsError(userId);
    }

    const hashPassword = await bcrypt.hash(password, authConfig.passwordSalt);

    user = await users.create({
      id: userId,
      password: hashPassword,
      tokenMarker: 1,
    });

    await user.save();

    const token = tokenService.generateTokens({
      id: user.id,
      marker: user.tokenMarker,
    });

    return {
      token: token.accessToken,
      refreshToken: token.refreshToken,
    };
  }

  async signin({ userId, password }) {
    const user = await users.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw ApiError.userNotExistsError(userId);
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.wrongPassword(userId);
    }

    const token = tokenService.generateTokens({
      id: user.id,
      marker: user.tokenMarker,
    });

    return {
      userId: user.id,
      token: token.accessToken,
      refreshToken: token.refreshToken,
    };
  }

  async incrementTokenMarker(userId) {
    const updated = await users.increment(
      {
        tokenMarker: 1,
      },
      {
        where: {
          id: userId,
        },
      }
    );

    if (updated.length === 0) {
      throw ApiError.userNotExistsError(userId);
    }
  }
}

module.exports = new AuthService();
