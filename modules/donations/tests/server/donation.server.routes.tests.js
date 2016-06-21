'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Donation = mongoose.model('Donation'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, donation;

/**
 * Donation routes tests
 */
describe('Donation CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Donation
    user.save(function () {
      donation = {
        name: 'Donation name'
      };

      done();
    });
  });

  it('should be able to save a Donation if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Donation
        agent.post('/api/donations')
          .send(donation)
          .expect(200)
          .end(function (donationSaveErr, donationSaveRes) {
            // Handle Donation save error
            if (donationSaveErr) {
              return done(donationSaveErr);
            }

            // Get a list of Donations
            agent.get('/api/donations')
              .end(function (donationsGetErr, donationsGetRes) {
                // Handle Donation save error
                if (donationsGetErr) {
                  return done(donationsGetErr);
                }

                // Get Donations list
                var donations = donationsGetRes.body;

                // Set assertions
                (donations[0].user._id).should.equal(userId);
                (donations[0].name).should.match('Donation name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Donation if not logged in', function (done) {
    agent.post('/api/donations')
      .send(donation)
      .expect(403)
      .end(function (donationSaveErr, donationSaveRes) {
        // Call the assertion callback
        done(donationSaveErr);
      });
  });

  it('should not be able to save an Donation if no name is provided', function (done) {
    // Invalidate name field
    donation.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Donation
        agent.post('/api/donations')
          .send(donation)
          .expect(400)
          .end(function (donationSaveErr, donationSaveRes) {
            // Set message assertion
            (donationSaveRes.body.message).should.match('Please fill Donation name');

            // Handle Donation save error
            done(donationSaveErr);
          });
      });
  });

  it('should be able to update an Donation if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Donation
        agent.post('/api/donations')
          .send(donation)
          .expect(200)
          .end(function (donationSaveErr, donationSaveRes) {
            // Handle Donation save error
            if (donationSaveErr) {
              return done(donationSaveErr);
            }

            // Update Donation name
            donation.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Donation
            agent.put('/api/donations/' + donationSaveRes.body._id)
              .send(donation)
              .expect(200)
              .end(function (donationUpdateErr, donationUpdateRes) {
                // Handle Donation update error
                if (donationUpdateErr) {
                  return done(donationUpdateErr);
                }

                // Set assertions
                (donationUpdateRes.body._id).should.equal(donationSaveRes.body._id);
                (donationUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Donations if not signed in', function (done) {
    // Create new Donation model instance
    var donationObj = new Donation(donation);

    // Save the donation
    donationObj.save(function () {
      // Request Donations
      request(app).get('/api/donations')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Donation if not signed in', function (done) {
    // Create new Donation model instance
    var donationObj = new Donation(donation);

    // Save the Donation
    donationObj.save(function () {
      request(app).get('/api/donations/' + donationObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', donation.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Donation with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/donations/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Donation is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Donation which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Donation
    request(app).get('/api/donations/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Donation with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Donation if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Donation
        agent.post('/api/donations')
          .send(donation)
          .expect(200)
          .end(function (donationSaveErr, donationSaveRes) {
            // Handle Donation save error
            if (donationSaveErr) {
              return done(donationSaveErr);
            }

            // Delete an existing Donation
            agent.delete('/api/donations/' + donationSaveRes.body._id)
              .send(donation)
              .expect(200)
              .end(function (donationDeleteErr, donationDeleteRes) {
                // Handle donation error error
                if (donationDeleteErr) {
                  return done(donationDeleteErr);
                }

                // Set assertions
                (donationDeleteRes.body._id).should.equal(donationSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Donation if not signed in', function (done) {
    // Set Donation user
    donation.user = user;

    // Create new Donation model instance
    var donationObj = new Donation(donation);

    // Save the Donation
    donationObj.save(function () {
      // Try deleting Donation
      request(app).delete('/api/donations/' + donationObj._id)
        .expect(403)
        .end(function (donationDeleteErr, donationDeleteRes) {
          // Set message assertion
          (donationDeleteRes.body.message).should.match('User is not authorized');

          // Handle Donation error error
          done(donationDeleteErr);
        });

    });
  });

  it('should be able to get a single Donation that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Donation
          agent.post('/api/donations')
            .send(donation)
            .expect(200)
            .end(function (donationSaveErr, donationSaveRes) {
              // Handle Donation save error
              if (donationSaveErr) {
                return done(donationSaveErr);
              }

              // Set assertions on new Donation
              (donationSaveRes.body.name).should.equal(donation.name);
              should.exist(donationSaveRes.body.user);
              should.equal(donationSaveRes.body.user._id, orphanId);

              // force the Donation to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Donation
                    agent.get('/api/donations/' + donationSaveRes.body._id)
                      .expect(200)
                      .end(function (donationInfoErr, donationInfoRes) {
                        // Handle Donation error
                        if (donationInfoErr) {
                          return done(donationInfoErr);
                        }

                        // Set assertions
                        (donationInfoRes.body._id).should.equal(donationSaveRes.body._id);
                        (donationInfoRes.body.name).should.equal(donation.name);
                        should.equal(donationInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Donation.remove().exec(done);
    });
  });
});
