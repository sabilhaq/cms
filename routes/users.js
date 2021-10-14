var express = require("express");
var router = express.Router();
var User = require("../models/user");
const jwt = require("jsonwebtoken");
const accessTokenSecret = "youraccesstokensecret";

router.post("/register", async function (req, res, next) {
  try {
    if (req.body.retypepassword != req.body.password) {
      return res.status(500).json({ err: "retype password not match" });
    }

    const accessToken = jwt.sign({ email: req.body.email }, accessTokenSecret);
    req.body.token = accessToken
    const user = await User.create(req.body);

    const response = {
      data: {
        email: user.email,
      },
      token: user.token,
    }
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async function (req, res, next) {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user.verify(req.body.password)) {
      return res.status(500).json({ err: "invalid password" });
    }

    if (!user.token) {
      const refreshToken = jwt.sign({ email: req.body.email }, accessTokenSecret);
      const filter = { email: req.body.email }
      const update = { token: refreshToken }

      user = await User.findOneAndUpdate(filter, update, {
        new: true,
      });
    }

    const userVerified = jwt.verify(user.token, accessTokenSecret);
    if (!userVerified) {
      const refreshToken = jwt.sign({ email: user.email }, accessTokenSecret);
      const filter = { email: user.email }
      const update = { token: refreshToken }

      user = await User.findOneAndUpdate(filter, update, {
        new: true,
      });
    }

    const response = {
      data: {
        email: user.email,
      },
      token: user.token,
    }
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/check", async (req, res) => {
  try {
    jwt.verify(req.body.token, accessTokenSecret, (err, user) => {
      if (err || !user) {
        throw err;
      }

      res.json({ valid: true });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/destroy", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "invalid token" });
    }
    const reqToken = authHeader.split(" ")[1];
    const filter = { token: reqToken }
    const update = { token: null }

    const user = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.json({ logout: true });
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
