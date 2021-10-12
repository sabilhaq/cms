var chai = require("chai");
var chaiHttp = require("chai-http");
var app = require("../app");
var Map = require("../models/map");

chai.use(chaiHttp);

chai.should();

describe("Map", function () {
  beforeEach(function (done) {
    let map = new Map({ title: "Trans Studio Mall", lat: -6.9261257, lng: 107.6343728 });
    map.save(function () {
      done();
    });
  });

  afterEach(function (done) {
    Map.findOneAndRemove({ title: "Trans Studio Mall" }).then(function () {
      done();
    });
  });

  it("should get list from map searched with method POST", function (done) {
    chai
      .request(app)
      .post("/api/maps/search")
      .send({ title: "Trans Studio Mall" })
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.to.be.json;
        res.body.should.be.a("array");
        res.body[res.body.length - 1].should.be.a("object");
        res.body[res.body.length - 1].should.have.property("_id");
        res.body[res.body.length - 1].should.have.property("title");
        res.body[res.body.length - 1].should.have.property("lat");
        res.body[res.body.length - 1].should.have.property("lng");
        res.body[res.body.length - 1].title.should.equal("Trans Studio Mall");
        res.body[res.body.length - 1].lat.should.equal(-6.9261257);
        res.body[res.body.length - 1].lng.should.equal(107.6343728);
        done();
      });
  });

  it("should get list from map with method GET", function (done) {
    chai
      .request(app)
      .get("/api/maps")
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.to.be.json;
        res.body.should.be.a("array");
        res.body[res.body.length - 1].should.be.a("object");
        res.body[res.body.length - 1].should.have.property("_id");
        res.body[res.body.length - 1].should.have.property("title");
        res.body[res.body.length - 1].should.have.property("lat");
        res.body[res.body.length - 1].should.have.property("lng");
        res.body[res.body.length - 1].title.should.equal("Trans Studio Mall");
        res.body[res.body.length - 1].lat.should.equal(-6.9261257);
        res.body[res.body.length - 1].lng.should.equal(107.6343728);
        done();
      });
  });

  it("should create one map with method POST", function (done) {
    chai
      .request(app)
      .post("/api/maps")
      .send({ title: "Cihampelas Walk", lat: -6.8965475, lng: 107.6103536 })
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
        res.body.data.should.have.property("title");
        res.body.data.should.have.property("lat");
        res.body.data.should.have.property("lng");
        res.body.data.title.should.equal("Cihampelas Walk");
        res.body.data.lat.should.equal(-6.8965475);
        res.body.data.lng.should.equal(107.6103536);
        Map.findById(res.body.data._id).then(function (map) {
          map.remove().then(function () {
            done()
          })
        })
      });
  });

  it("should edit one map with method PUT/<ID_MAP>", function (done) {
    chai.request(app)
      .get("/api/maps")
      .end(function (err, response) {
        chai.request(app)
          .put(`/api/maps/${response.body[response.body.length - 1]._id}`)
          .send({ title: "Cihampelas Walk", lat: -6.8965475, lng: 107.6103536 })
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
            res.body.data.should.have.property("title");
            res.body.data.should.have.property("lat");
            res.body.data.should.have.property("lng");
            res.body.data.title.should.equal("Cihampelas Walk");
            res.body.data.lat.should.equal(-6.8965475);
            res.body.data.lng.should.equal(107.6103536);
            Map.findById(res.body.data._id).then(function (map) {
              map.remove().then(function () {
                done()
              })
            })
          });
      });
  });

  it("should delete one map with method DELETE/<ID_MAP>", function (done) {
    chai.request(app)
      .get("/api/maps")
      .end(function (err, response) {
        chai.request(app)
          .delete(`/api/maps/${response.body[response.body.length - 1]._id}`)
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
            res.body.data.should.have.property("title");
            res.body.data.should.have.property("lat");
            res.body.data.should.have.property("lng");
            res.body.data.title.should.equal("Trans Studio Mall");
            res.body.data.lat.should.equal(-6.9261257);
            res.body.data.lng.should.equal(107.6343728);
            done()
          });
      });
  });


  it("should get one map with method GET/<ID_MAP>", function (done) {
    chai.request(app)
      .get("/api/maps")
      .end(function (err, response) {
        chai.request(app)
          .get(`/api/maps/${response.body[response.body.length - 1]._id}`)
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
            res.body.data.should.have.property("title");
            res.body.data.should.have.property("lat");
            res.body.data.should.have.property("lng");
            res.body.data.title.should.equal("Trans Studio Mall");
            res.body.data.lat.should.equal(-6.9261257);
            res.body.data.lng.should.equal(107.6343728);
            done()
          });
      });
  });
});
