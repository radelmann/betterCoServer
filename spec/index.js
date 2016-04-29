var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var app = require('../index.js');

var token;
var userId;
var _id;

describe("better company api - Server - REST API Routes", function() {


  describe('POST /signup', function() {
    it('responds with a 200 (successful) and returned json object of jwt token', function(done) {

      var data = {
        email: 'test@username.com',
        password: 'password'
      };

      request(app)
        .post('/signup')
        .send(data)
        .expect(function(res) {
          expect(res.body).to.exist;
          expect(res.body.token).to.exist;
        })
        .expect(200, done);
    });
  });

  describe('POST /signin', function() {
    it('responds with a 200 (successful) and returned json object of jwt token', function(done) {

      var data = {
        email: 'test@username.com',
        password: 'password'
      };

      request(app)
        .post('/signin')
        .send(data)
        .expect(function(res) {
          expect(res.body).to.exist;
          expect(res.body.token).to.exist;
          //set token for test cases that follow
          token = res.body.token;
        })
        .expect(200, done);
    });
  });

  describe('GET /comment', function() {
    it('responds with a 200 (successful) and the json array of messages', function(done) {

      request(app)
        .get('/comments')
        .set('authorization', token)
        .expect(function(res) {
          expect(res.body.data).to.exist;
          expect(res.body.data).to.be.array;
        })
        .expect(200, done);
    });
  });

  describe('POST /comment', function() {
    it('responds with a 200 (successful) and returned json object of new comment post', function(done) {

      var data = {
        message: 'this is a test post',
        email: 'test@username.com'
      };

      request(app)
        .post('/comment')
        .set('authorization', token)
        .send(data)
        .expect(function(res) {
          expect(res.body).to.exist;
          expect(res.body._id).to.exist;
          expect(res.body.message).to.equal('this is a test post');
          expect(res.body.email).to.equal('test@username.com');
          _id = res.body._id;
        })
        .expect(200, done);
    });
  });

  describe('DELETE /comment', function() {
    it('responds with a 200 (successful)', function(done) {

      request(app)
        .delete('/comment/' + _id)
        .set('authorization', token)
        .expect(function(res) {
          expect(res.body).to.exist;
          expect(res.body.ok).to.equal(1);
        })
        .expect(200, done);
    });
  });

  describe('DELETE /user', function() {
    it('responds with a 200 (successful)', function(done) {

      request(app)
        .delete('/user')
        .set('authorization', token)
        .expect(function(res) {
          expect(res.body).to.exist;
          expect(res.body._id).to.exist;
        })
        .expect(200, done);
    });
  });
});