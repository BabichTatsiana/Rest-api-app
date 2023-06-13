const File = (sequelize, Sequelize) => {
  const File = sequelize.define("files", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    extension: {
      type: Sequelize.STRING,
    },
    mimeType: {
      type: Sequelize.STRING,
      field: "mime_type",
    },
    size: {
      type: Sequelize.INTEGER,
    },
    dateUpload: {
      type: Sequelize.DATE,
    },
  });

  return File;
};
module.exports = File;
