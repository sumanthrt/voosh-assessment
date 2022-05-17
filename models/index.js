const dbConfigUrl = require("../config/db.config");
const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = dbConfigUrl.url;
db.user = require("./user.model")(mongoose);
db.order = require("./order.model")(mongoose);

module.exports = db;
