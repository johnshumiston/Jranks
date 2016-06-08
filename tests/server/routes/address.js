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

    describe('Authenticated request', function () {

        var loggedInAgent;

        var userInfo = {
            first_name: 'Johnes',
            birth: 12/12/1912,
            last_name: 'Humingstone',
            email: 'joe@gmail.com',
            password: 'shoopdawoop'
        };

        beforeEach('Create a user', function (done) {
            return User.create(userInfo).then(function (user) {
               done();
           }).catch(done);
        });

        beforeEach('Create loggedIn user agent and authenticate', function (done) {
            loggedInAgent = supertest.agent(app);
            loggedInAgent.post('/login').send(userInfo).end(done);
        });

        it('should get with 200 response and with an array as the body', function (done) {
            loggedInAgent.get('/api/members/secret-stash').expect(200).end(function (err, response) {
                if (err) return done(err);
                expect(response.body).to.be.an('array');
                done();
            });
        });

    });

});