const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./models");
require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(cors());

require("./routes")(app);

db.sync();

const port = process.env.PORT || 5000;
app.listen(port);

module.exports = app;
