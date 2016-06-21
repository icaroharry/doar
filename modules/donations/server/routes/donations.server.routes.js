'use strict';

/**
 * Module dependencies
 */
var donationsPolicy = require('../policies/donations.server.policy'),
  donations = require('../controllers/donations.server.controller');

module.exports = function(app) {
  // Donations Routes
  app.route('/api/donations').all(donationsPolicy.isAllowed)
    .get(donations.list)
    .post(donations.create);

  app.route('/api/donations/:donationId').all(donationsPolicy.isAllowed)
    .get(donations.read)
    .put(donations.update)
    .delete(donations.delete);

  // Finish by binding the Donation middleware
  app.param('donationId', donations.donationByID);
};
