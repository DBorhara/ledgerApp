const User = require("./user");
const Credit = require("./credit");
const Debit = require("./debit");
const Total = require("./total");

//Associations
User.hasMany(Credit, { as: "credits" });
Credit.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(Debit, { as: "debits" });
Debit.belongsTo(User, { foreignKey: "userId", as: "user" });

Total.belongsTo(User, { foreignKey: "userId", as: "user" });

module.exports = {
  User,
  Credit,
  Debit,
  Total,
};
