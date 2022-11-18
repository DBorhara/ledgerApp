const Sequelize = require("sequelize");
const db = require("../db");

const Total = db.define("total", {
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Total;
