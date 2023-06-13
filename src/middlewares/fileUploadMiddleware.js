const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, callback) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = file.fieldname + "-" + uniqueSuffix + "." + file.originalname.split(".").pop();
    callback(null, filename);
  },
});

module.exports = multer({ storage: storage }).single("file");
