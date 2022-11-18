const Sequelize = require("sequelize");
const db = require("../db");

const Credit = db.define("credit", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Credit;
