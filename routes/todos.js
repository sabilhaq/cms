var express = require("express");
var router = express.Router();
const Todo = require("../models/todo");
const User = require("../models/user");

/* GET todos listing. */
router.get("/", async function (req, res, next) {
  try {
    const todos = await Todo.find({}).populate("user");
    res.json(todos);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    const todo = await Todo.create(req.body);
    const user = await User.findOne({ _id: todo.user._id });
    user.todos.push(todo._id);
    await user.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(todo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id, {
      new: true,
    });
    res.json(todo);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
