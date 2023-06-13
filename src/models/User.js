const User = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    // in case if we have a monolith we can store this field in memory
    tokenMarker: {
      type: Sequelize.INTEGER,
      field: "token_marker",
    },
  });

  return User;
};
module.exports = User;
