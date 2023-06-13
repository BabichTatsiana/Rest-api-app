const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const db = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

function sync() {
  db.sync()
      .then(() => console.log("Connection has been established successfully."))
      .catch((err) => console.error("Unable to connect to the databasee : ", err));
}

module.exports =  {
  sync: sync,

  users: require("./User.js")(db, Sequelize),
  files: require("./File.js")(db, Sequelize),
};
