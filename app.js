var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/cmsdb");
}

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var todosRouter = require("./routes/todos");
var dataRouter = require("./routes/data");
var datadateRouter = require("./routes/datadate");
var mapsRouter = require("./routes/maps");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/data", dataRouter);
app.use("/api/datadate", datadateRouter);
app.use("/api/maps", mapsRouter);
app.use("/todos", todosRouter);

module.exports = app;
