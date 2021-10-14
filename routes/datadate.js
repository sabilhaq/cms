var express = require("express");
var router = express.Router();
var helper = require("../helpers/util")
var Datadate = require("../models/datadate");
var moment = require("moment");

router.get("/", async function (req, res, next) {
  try {
    let datadate = await Datadate.find().select("-__v");
    const response = datadate.map((item) => {
      item._doc.letter = moment(item._doc.letter).format("YYYY-MM-DD");
      return item._doc;
    });
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/search", helper.isLoggedIn, async function (req, res, next) {
  try {
    if (!req.body.letter) {
      delete req.body.letter
    }
    if (!req.body.frequency) {
      delete req.body.frequency
    }
    const datadate = await Datadate.find(req.body).select("-__v");
    const response = datadate.map((item) => {
      item._doc.letter = moment(item._doc.letter).format("YYYY-MM-DD");
      return item._doc;
    });
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", helper.isLoggedIn, async function (req, res, next) {
  try {
    const datadate = await Datadate.create(req.body);
    const response = {
      success: true,
      message: "data have been added",
      data: {
        _id: datadate._id,
        letter: moment(datadate.letter).format("YYYY-MM-DD"),
        frequency: datadate.frequency,
      },
    };
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", helper.isLoggedIn, async function (req, res, next) {
  try {
    const datadate = await Datadate.findOne({ _id: req.params.id }).select(
      "-__v"
    );
    const response = {
      success: true,
      message: "data found",
      data: {
        _id: datadate._id,
        letter: moment(datadate.letter).format("YYYY-MM-DD"),
        frequency: datadate.frequency,
      },
    };
    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", helper.isLoggedIn, async function (req, res, next) {
  try {
    const datadate = await Datadate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    const response = {
      success: true,
      message: "data have been updated",
      data: {
        _id: datadate._id,
        letter: moment(datadate.letter).format("YYYY-MM-DD"),
        frequency: datadate.frequency,
      },
    };
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", helper.isLoggedIn, async function (req, res, next) {
  try {
    const datadate = await Datadate.findByIdAndDelete(req.params.id, {
      new: true,
    });

    const response = {
      success: true,
      message: "data have been deleted",
      data: {
        _id: datadate._id,
        letter: moment(datadate.letter).format("YYYY-MM-DD"),
        frequency: datadate.frequency,
      },
    };
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
