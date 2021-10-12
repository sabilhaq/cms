var express = require("express");
var router = express.Router();
var Map = require("../models/map");

router.get("/", async function (req, res, next) {
  try {
    const map = await Map.find().select("-__v");
    res.json(map);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/search", async function (req, res, next) {
  try {
    const map = await Map.find(req.body).select("-__v");
    res.json(map);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    const map = await Map.create(req.body);
    const response = {
      success: true,
      message: "data have been added",
      data: {
        _id: map._id,
        title: map.title,
        lat: map.lat,
        lng: map.lng,
      },
    };
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const map = await Map.findOne({ _id: req.params.id }).select("-__v");
    const response = {
      success: true,
      message: "data found",
      data: {
        _id: map._id,
        title: map.title,
        lat: map.lat,
        lng: map.lng,
      },
    };
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    const map = await Map.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    const response = {
      success: true,
      message: "data have been updated",
      data: {
        _id: map._id,
        title: map.title,
        lat: map.lat,
        lng: map.lng,
      },
    };
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const map = await Map.findByIdAndDelete(req.params.id, {
      new: true,
    });

    const response = {
      success: true,
      message: "data have been deleted",
      data: {
        _id: map._id,
        title: map.title,
        lat: map.lat,
        lng: map.lng,
      },
    };
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
