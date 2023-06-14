const User = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING,
<<<<<<< HEAD
      allowNull: true,
=======
>>>>>>> 6381dc4eac5d0f8799c9828adf0a38d8659aa8ad
    },
    phoneNumber: {
      type: Sequelize.STRING,
      field: "phone_number",
<<<<<<< HEAD
      allowNull: true,
=======
>>>>>>> 6381dc4eac5d0f8799c9828adf0a38d8659aa8ad
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
