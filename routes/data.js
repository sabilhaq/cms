var express = require("express");
var router = express.Router();
var Data = require("../models/data");

router.get("/", async function (req, res, next) {
  try {
    const data = await Data.find().select("-__v");
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/search", async function (req, res, next) {
  try {
    const data = await Data.find(req.body).select("-__v");
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    const data = await Data.create(req.body);
    data.letter = data.letter.slice(0, 10)
    const response = {
      success: true,
      message: "data have been added",
      data: {
        _id: data._id,
        letter: data.letter.slice(0, 10),
        frequency: data.frequency,
      },
    };
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const data = await Data.findOne({ _id: req.params.id }).select("-__v");
    const response = {
      success: true,
      message: "data found",
      data: {
        _id: data._id,
        letter: data.letter,
        frequency: data.frequency,
      },
    };
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    const data = await Data.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    const response = {
      success: true,
      message: "data have been updated",
      data: {
        _id: data._id,
        letter: data.letter,
        frequency: data.frequency,
      },
    };
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const data = await Data.findByIdAndDelete(req.params.id, {
      new: true,
    });

    const response = {
      success: true,
      message: "data have been deleted",
      data: {
        _id: data._id,
        letter: data.letter,
        frequency: data.frequency,
      },
    };
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
