const router = require("express").Router();
const { Total } = require("../db/models");
module.exports = router;

//mounted on /total

router.get("/", async (req, res, next) => {
  try {
    const total = await Total.findOne({
      attributes: ["id", "amount"],
      order: [["createdAt", "DESC"]],
    });
    res.json(total);
  } catch (err) {
    next(err);
  }
});

router.post("/resetTotal", async (req, res, next) => {
  try {
    const zeroedTotal = await Total.create({ amount: 0, userId: req.user.id });
    res.json(zeroedTotal);
  } catch (err) {
    next(err);
  }
});
