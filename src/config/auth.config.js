module.exports = {
    passwordSalt: 3,
    accessTokenKey: process.env.TOKEN_ACCESS_KEY ?? "accessTokenKey",
    accessTokenLifeTime: "10m",
    refreshTokenKey: process.env.REFRESH_ACCESS_KEY ?? "refreshTokenKey",
    refreshTokenLifeTime: "30d",
};
