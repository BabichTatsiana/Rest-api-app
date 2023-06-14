const bcrypt = require("bcrypt");
const authConfig = require("../config/auth.config");
const tokenService = require("./token.service");
const { users } = require("../models/index");
const ApiError = require("../exceptions/apiError");
const { validateEmail, validatePhoneNumber } = require("../validators");

function userIdentifierSelector(identifier) {
  if (validateEmail(identifier)) {
    return { email: identifier };
  } else if (validatePhoneNumber(identifier)) {
    return { phoneNumber: identifier };
  } else {
    throw ApiError.invalidUserIdentifier(identifier);
  }
}
function createJwtPayload(user) {
  return {
    id: user.id,
    email: user.email,
    phoneNumber: user.phoneNumber,
    marker: user.tokenMarker,
  };
}

class AuthService {
  async register({ identifier, password }) {
    let user = await users.findOne({
      where: userIdentifierSelector(identifier),
    });
    if (user) {
      throw ApiError.userExistsError(identifier);
    }

    const hashPassword = await bcrypt.hash(password, authConfig.passwordSalt);

    user = await users.create({
      ...userIdentifierSelector(identifier),
      password: hashPassword,
      tokenMarker: 1,
    });

    await user.save();

    const token = tokenService.generateTokens(createJwtPayload(user));

    return {
      token: token.accessToken,
      refreshToken: token.refreshToken,
    };
  }

  async signin({ identifier, password }) {
    const user = await users.findOne({
      where: userIdentifierSelector(identifier),
    });
    if (!user) {
      throw ApiError.userNotExistsError(identifier);
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.wrongPassword();
    }

    const token = tokenService.generateTokens(createJwtPayload(user));

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
        where: { id: userId },
      }
    );
    if (updated.length === 0) {
      throw ApiError.userNotExistsError(userId);
    }
  }
}

module.exports = new AuthService();
