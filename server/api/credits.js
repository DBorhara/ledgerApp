const router = require("express").Router();
const { Credit, Total } = require("../db/models");
module.exports = router;

//mounted on /credits

router.get("/", async (req, res, next) => {
  try {
    const allCredits = await Credit.findAll({
      attributes: ["id", "name", "amount"],
    });
    res.json(allCredits);
  } catch (err) {
    next(err);
  }
});

//Create a credit and create new entry total
router.post("/increment", async (req, res, next) => {
  try {
    const creditLog = await Credit.create({
      name: req.body.name,
      amount: req.body.amount,
    });
    const total = await Total.findOne({
      order: [["createdAt", "DESC"]],
    });
    total.amount += req.body.amount;
    const incrementedTotal = await Total.create({
      amount: total.amount,
    });
    res.json(creditLog);
  } catch (err) {
    next(err);
  }
});

//ID Match for specific credit
router.get("/:id", async (req, res, next) => {
  try {
    const creditByID = await Credit.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(creditByID);
  } catch (err) {
    next(err);
  }
});

//Name Match
router.get("/:name", async (req, res, next) => {
  try {
    const creditByName = await Credit.findAll({
      where: {
        id: req.params.name,
      },
    });
    res.json(creditByName);
  } catch (err) {
    next(err);
  }
});

// Reset Credits
router.post("/reset", async (req, res, next) => {
  try {
    const destroy = await Credit.destroy({ where: {}, cascade: false });
    const creditWipe = await Credit.create({ name: "start", amount: 0 });
    res.json(creditWipe);
  } catch (err) {
    next(err);
  }
});
