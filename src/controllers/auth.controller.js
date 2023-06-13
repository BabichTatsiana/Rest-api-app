const authService = require("../services/auth.service");
const tokenService = require("../services/token.service");

class AuthController {
  refreshToken(req, res) {
    const token = tokenService.refreshAccessToken(req.body.refreshToken);
    res.status(200).json(token);
  }

  async register(req, res) {
    const user = await authService.register(req.body);
    res.status(200).json(user);
  }

  async signin(req, res) {
    const user = await authService.signin(req.body);
    res.status(200).json(user);
  }

  info(req, res) {
    const userId = req.user.id;
    res.status(200).json({ userId });
  }

  async logout(req, res) {
    await authService.incrementTokenMarker(req.user.id);
    res.status(200).send();
  }
}

module.exports = new AuthController();
