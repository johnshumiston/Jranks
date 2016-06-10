var expect = require('chai').expect;
var Sequelize = require('sequelize');
var db = require('../../../server/db')
var supertest = require('supertest');

describe('Addresses Route', function () {

   var app, User, Address;

   beforeEach('Sync DB', function () {
       return db.sync({ force: true });
   });

   beforeEach('Create app', function () {
       app = require('../../../server/app')(db);
       User = db.model('user');
       Address = db.model('address');
   });

    describe('Find all get request', function () {

        var guestAgent;

        beforeEach('Create guest agent', function () {
            guestAgent = supertest.agent(app);
        });

        it('should get a 200 response', function (done) {
            guestAgent.get('/api/address')
                .expect(200)
                .end(done);
        });

    });

    describe('Find addresses for a single user', function () {

        var guestAgent;

        beforeEach('Create guest agent', function () {
            guestAgent = supertest.agent(app);
        });

        it('should get a 200 response', function (done) {
            guestAgent.get('/api/address/' + 1 + '/all')
                .expect(200)
                .end(done);
        });

        it('should get a 200 response', function (done) {
            guestAgent.get('/api/address/' + 1 + '/primary')
                .expect(200)
                .end(done);
        });

    });


    describe('Posts, updates and deletes user addresses', function () {

        var loggedInAgent,
            addressInfo

        var userInfo = {
            name: 'Johnes Burmingtonestillman',
            birth: 12/12/1912,
            email: 'joe@gmail.com',
            password: 'shoopdawoop'
        };


        beforeEach('Create a user', function (done) {
            return User.create(userInfo).then(function (user) {
               done();
           }).catch(done);
        });

        beforeEach('Authenticate user and update addressInfo', function (done) {
            loggedInAgent = supertest.agent(app);
            loggedInAgent.post('/login').send(userInfo).end(done);
            
            addressInfo = {
              instructions: "Take the x Road",
              is_primary: true,
              street_1: "First North",
              state: "NY",
              city: "NYC",
              zip: "11211",
              userId: loggedInAgent.id
            }
        });

        it('should get with 201 response when posting address', function (done) {
            loggedInAgent.post('/api/address/').send(addressInfo).expect(201).end(function (err, response) {
              // postedAddress = response.body;
                if (err) return done(err);
                done();
            });
        });

        it('should get with 200 response when updating address', function (done) {

          //the below only posts a new address to user to test the put route
          loggedInAgent.post('/api/address/').send(addressInfo).end(function (err, response) {
              if (err) return done(err);
            });

          
          loggedInAgent.put('/api/address/' + 1).send({street_1: "test"}).expect(200).end(function (err, response) {
                if (err) return done(err);
                done();
            });
        });

        it('should get with 204 response when deleting address', function (done) {

          //the below only posts a new address to user to test the delete route
          loggedInAgent.post('/api/address/').send(addressInfo).end(function (err, response) {
              if (err) return done(err);
            });

          
          loggedInAgent.delete('/api/address/' + 1).expect(204).end(function (err, response) {
                if (err) return done(err);
                done();
            });
        });
    });
});