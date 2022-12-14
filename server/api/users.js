const router = require("express").Router();
const { User } = require("../db/models");
module.exports = router;

// mounted on /users

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "email"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const users = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
