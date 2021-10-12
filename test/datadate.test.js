var chai = require("chai");
var chaiHttp = require("chai-http");
var app = require("../app");
var Datadate = require("../models/datadate");

chai.use(chaiHttp);

chai.should();

describe("Datadate", function () {
  beforeEach(function (done) {
    let datadate = new Datadate({ letter: "2017-12-31", frequency: 1.1 });
    datadate.save(function () {
      done();
    });
  });

  afterEach(function (done) {
    Datadate.findOneAndRemove({ frequency: 1.1 }).then(function () {
      done();
    });
  });

  it("should get list from datadate searched with method POST", function (done) {
    chai
      .request(app)
      .post("/api/datadate/search")
      .send({ letter: "2017-12-31", frequency: 1.1 })
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.to.be.json;
        res.body.should.be.a("array");
        res.body[res.body.length - 1].should.be.a("object");
        res.body[res.body.length - 1].should.have.property("_id");
        res.body[res.body.length - 1].should.have.property("letter");
        res.body[res.body.length - 1].should.have.property("frequency");
        res.body[res.body.length - 1].letter.should.equal("2017-12-31");
        res.body[res.body.length - 1].frequency.should.equal(1.1);
        done();
      });
  });

  it("should get list from datadate with method GET", function (done) {
    chai
      .request(app)
      .get("/api/datadate")
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.to.be.json;
        res.body.should.be.a("array");
        res.body[res.body.length - 1].should.be.a("object");
        res.body[res.body.length - 1].should.have.property("_id");
        res.body[res.body.length - 1].should.have.property("letter");
        res.body[res.body.length - 1].should.have.property("frequency");
        res.body[res.body.length - 1].letter.should.equal("2017-12-31");
        res.body[res.body.length - 1].frequency.should.equal(1.1);
        done();
      });
  });

  it("should create one datadate with method POST", function (done) {
    chai
      .request(app)
      .post("/api/datadate")
      .send({ letter: "2020-12-31", frequency: 1.7 })
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.to.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("success");
        res.body.should.have.property("message");
        res.body.should.have.property("data");
        res.body.success.should.equal(true);
        res.body.message.should.equal("data have been added");
        res.body.data.should.be.a("object");
        res.body.data.should.have.property("_id");
        res.body.data.should.have.property("letter");
        res.body.data.should.have.property("frequency");
        res.body.data.letter.should.equal("2020-12-31");
        res.body.data.frequency.should.equal(1.7);
        Datadate.findById(res.body.data._id).then(function (datadate) {
          datadate.remove().then(function () {
            done()
          })
        })
      });
  });

  it("should edit one datadate with method PUT/<ID_DATADATE>", function (done) {
    chai.request(app)
      .get("/api/datadate")
      .end(function (err, response) {
        chai.request(app)
          .put(`/api/datadate/${response.body[response.body.length - 1]._id}`)
          .send({ letter: "2021-12-31", frequency: 1.8 })
          .end(function (err, res) {
            res.should.have.status(200);
            res.should.to.be.json;
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("message");
            res.body.should.have.property("data");
            res.body.success.should.equal(true);
            res.body.message.should.equal("data have been updated");
            res.body.data.should.be.a("object");
            res.body.data.should.have.property("_id");
            res.body.data.should.have.property("letter");
            res.body.data.should.have.property("frequency");
            res.body.data.letter.should.equal("2021-12-31");
            res.body.data.frequency.should.equal(1.8);
            Datadate.findById(res.body.data._id).then(function (datadate) {
              datadate.remove().then(function () {
                done()
              })
            })
          });
      });
  });

  it("should delete one datadate with method DELETE/<ID_DATADATE>", function (done) {
    chai.request(app)
      .get("/api/datadate")
      .end(function (err, response) {
        chai.request(app)
          .delete(`/api/datadate/${response.body[response.body.length - 1]._id}`)
          .end(function (err, res) {
            res.should.have.status(200);
            res.should.to.be.json;
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("message");
            res.body.should.have.property("data");
            res.body.success.should.equal(true);
            res.body.message.should.equal("data have been deleted");

            res.body.data.should.be.a("object");
            res.body.data.should.have.property("_id");
            res.body.data.should.have.property("letter");
            res.body.data.should.have.property("frequency");
            res.body.data.letter.should.equal("2017-12-31");
            res.body.data.frequency.should.equal(1.1);
            done()
          });
      });
  });


  it("should get one datadate with method GET/<ID_DATADATE>", function (done) {
    chai.request(app)
      .get("/api/datadate")
      .end(function (err, response) {
        chai.request(app)
          .get(`/api/datadate/${response.body[response.body.length - 1]._id}`)
          .end(function (err, res) {
            res.should.have.status(200);
            res.should.to.be.json;
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("message");
            res.body.should.have.property("data");
            res.body.success.should.equal(true);
            res.body.message.should.equal("data found");
            res.body.data.should.be.a("object");
            res.body.data.should.have.property("_id");
            res.body.data.should.have.property("letter");
            res.body.data.should.have.property("frequency");
            res.body.data.letter.should.equal("2017-12-31");
            res.body.data.frequency.should.equal(1.1);
            done()
          });
      });
  });
});
