var fs = require("fs");
const mongoose = require("mongoose");
var Datadate = require("../models/datadate");

let dataString = fs.readFileSync("seeds/data.json", "utf-8");
let data = JSON.parse(dataString);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/cmsdb");
}

Datadate.insertMany(data)
  .then(function () {
    console.log("Data inserted");
  })
  .catch(function (error) {
    console.log(error);
  });
