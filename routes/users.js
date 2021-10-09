var express = require("express");
var router = express.Router();
var User = require("../models/user");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const users = await User.find({}).populate("todos");
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const user = await User.findByIdAndDelete(req.params.id, {
      new: true,
    });
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/check", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    res.json(user.verify(req.body.password));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
