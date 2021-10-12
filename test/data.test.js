var chai = require("chai");
var chaiHttp = require("chai-http");
var app = require("../app");
var Data = require("../models/data");

chai.use(chaiHttp);

chai.should();

describe("Data", function () {
  beforeEach(function (done) {
    let data = new Data({ letter: "A", frequency: 1.1 });
    data.save(function () {
      done();
    });
  });

  afterEach(function (done) {
    Data.findOneAndRemove({ frequency: 1.1 }).then(function () {
      done();
    });
  });

  it("should get list from data searched with method POST", function (done) {
    chai
      .request(app)
      .post("/api/data/search")
      .send({ letter: "A", frequency: 1.1 })
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.to.be.json;
        res.body.should.be.a("array");
        res.body[res.body.length - 1].should.be.a("object");
        res.body[res.body.length - 1].should.have.property("_id");
        res.body[res.body.length - 1].should.have.property("letter");
        res.body[res.body.length - 1].should.have.property("frequency");
        res.body[res.body.length - 1].letter.should.equal("A");
        res.body[res.body.length - 1].frequency.should.equal(1.1);
        done();
      });
  });

  it("should get list from data with method GET", function (done) {
    chai
      .request(app)
      .get("/api/data")
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.to.be.json;
        res.body.should.be.a("array");
        res.body[res.body.length - 1].should.be.a("object");
        res.body[res.body.length - 1].should.have.property("_id");
        res.body[res.body.length - 1].should.have.property("letter");
        res.body[res.body.length - 1].should.have.property("frequency");
        res.body[res.body.length - 1].letter.should.equal("A");
        res.body[res.body.length - 1].frequency.should.equal(1.1);
        done();
      });
  });

  it("should create one data with method POST", function (done) {
    chai
      .request(app)
      .post("/api/data")
      .send({ letter: "C", frequency: 1.7 })
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
        res.body.data.letter.should.equal("C");
        res.body.data.frequency.should.equal(1.7);
        Data.findById(res.body.data._id).then(function (data) {
          data.remove().then(function () {
            done()
          })
        })
      });
  });

  it("should edit one data with method PUT/<ID_DATA>", function (done) {
    chai.request(app)
      .get("/api/data")
      .end(function (err, response) {
        chai.request(app)
          .put(`/api/data/${response.body[response.body.length - 1]._id}`)
          .send({ letter: "B", frequency: 1.8 })
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
            res.body.data.letter.should.equal("B");
            res.body.data.frequency.should.equal(1.8);
            Data.findById(res.body.data._id).then(function (data) {
              data.remove().then(function () {
                done()
              })
            })
          });
      });
  });

  it("should delete one data with method DELETE/<ID_DATA>", function (done) {
    chai.request(app)
      .get("/api/data")
      .end(function (err, response) {
        chai.request(app)
          .delete(`/api/data/${response.body[response.body.length - 1]._id}`)
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
            res.body.data.letter.should.equal("A");
            res.body.data.frequency.should.equal(1.1);
            done()
          });
      });
  });


  it("should get one data with method GET/<ID_DATA>", function (done) {
    chai.request(app)
      .get("/api/data")
      .end(function (err, response) {
        chai.request(app)
          .get(`/api/data/${response.body[response.body.length - 1]._id}`)
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
            res.body.data.letter.should.equal("A");
            res.body.data.frequency.should.equal(1.1);
            done()
          });
      });
  });
});
