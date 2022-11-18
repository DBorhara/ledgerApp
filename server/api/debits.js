const router = require("express").Router();
const { Debit, Total } = require("../db/models");
module.exports = router;

//mounted on /debits

router.get("/", async (req, res, next) => {
  try {
    const allDebits = await Debit.findAll({
      attributes: ["id", "name", "amount"],
    });
    res.json(allDebits);
  } catch (err) {
    next(err);
  }
});

//Create a debit and create new entry total
router.post("/decrement", async (req, res, next) => {
  try {
    const debitLog = await Debit.create({
      name: req.body.name,
      amount: req.body.amount,
      userId: req.user.id,
    });
    const total = await Total.findOne({
      order: [["createdAt", "DESC"]],
    });
    total.amount -= req.body.amount;

    const decrementedTotal = await Total.create({
      amount: total.amount,
    });
    res.json(debitLog);
  } catch (err) {
    next(err);
  }
});

//ID Match for specific debit
router.get("/:id", async (req, res, next) => {
  try {
    const debitByID = await Debit.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(debitByID);
  } catch (err) {
    next(err);
  }
});

//Name Match
router.get("/:name", async (req, res, next) => {
  try {
    const debitByName = await Debit.findAll({
      where: {
        id: req.params.name,
      },
    });
    res.json(debitByName);
  } catch (err) {
    next(err);
  }
});

//Reset Debits
router.post("/reset", async (req, res, next) => {
  try {
    const destroy = await Debit.destroy({ where: {}, cascase: false });
    const debitWipe = await Debit.create({ name: "start", amount: 0 });
    res.json(debitWipe);
  } catch (err) {
    next(err);
  }
});
