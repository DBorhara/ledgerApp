const Sequelize = require("sequelize");
const db = require("../db");

const Debit = db.define("debit", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Debit;
