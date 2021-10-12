var chai = require("chai");
var chaiHttp = require("chai-http");
var app = require("../app");
var User = require("../models/user");
const jwt = require("jsonwebtoken");
const accessTokenSecret = "youraccesstokensecret";

chai.use(chaiHttp);

chai.should();

describe("User", function () {
  beforeEach(function (done) {
    let user = new User({ email: "rubi.henjaya@gmail.com", password: "1234" });
    user.save(function () {
      done();
    });
  });

  afterEach(function (done) {
    User.findOneAndRemove({ email: "rubi.henjaya@gmail.com" }).then(
      function () {
        done();
      }
    );
  });

  it("should register one user with method POST", function (done) {
    chai
      .request(app)
      .post("/api/users/register")
      .send({
        email: "rubi.henjaya@gmail.com",
        password: "1234",
        retypepassword: "1234",
      })
      .end(function (err, res) {
        res.body.data.should.be.a("object");
        res.body.data.should.have.property("email");
        res.body.should.have.property("token");
        res.body.data.email.should.equal("rubi.henjaya@gmail.com");
        User.findOne({ email: res.body.data.email }).then(function (user) {
          user.verify("1234").should.equal(true);
          done();
        });
      });
  });

  it("should authenticate one user with method POST", function (done) {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "rubi.henjaya@gmail.com", password: "1234" })
      .end(function (err, res) {
        res.body.data.should.be.a("object");
        res.body.data.should.have.property("email");
        res.body.should.have.property("token");
        res.body.data.email.should.equal("rubi.henjaya@gmail.com");
        User.findOne({ email: res.body.data.email }).then(function (user) {
          user.verify("1234").should.equal(true);
          done();
        });
      });
  });

  it("should check token of one user with method POST", function (done) {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "rubi.henjaya@gmail.com", password: "1234" })
      .end(function (err, response) {
        chai
          .request(app)
          .post("/api/users/check")
          .send({ token: response.body.token })
          .end(function (err, res) {
            res.body.should.be.a("object");
            res.body.should.have.property("valid");
            res.body.valid.should.equal(true);
            User.findOne({ email: response.body.data.email }).then(function (user) {
              user.verify('1234').should.equal(true)
              done()
            })
          });
      });
  });

  it("should destroy token of one user with method POST", function (done) {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "rubi.henjaya@gmail.com", password: "1234" })
      .end(function (err, response) {
        chai
          .request(app)
          .get("/api/users/destroy")
          .set({ Authorization: `Bearer ${response.body.data.token}` })
          .end(function (err, res) {
            res.body.should.be.a("object");
            res.body.should.have.property("logout");
            res.body.logout.should.equal(true);
            User.findOne({ email: response.body.data.email }).then(function (
              user
            ) {
              user.verify("1234").should.equal(true);
              done();
            });
          });
      });
  });
});
