'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Donation = mongoose.model('Donation'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Donation
 */
exports.create = function(req, res) {
  var donation = new Donation(req.body);
  donation.user = req.user;

  donation.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(donation);
    }
  });
};

/**
 * Show the current Donation
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var donation = req.donation ? req.donation.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  donation.isCurrentUserOwner = req.user && donation.user && donation.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(donation);
};

/**
 * Update a Donation
 */
exports.update = function(req, res) {
  var donation = req.donation ;

  donation = _.extend(donation , req.body);

  donation.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(donation);
    }
  });
};

/**
 * Delete an Donation
 */
exports.delete = function(req, res) {
  var donation = req.donation ;

  donation.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(donation);
    }
  });
};

/**
 * List of Donations
 */
exports.list = function(req, res) { 
  Donation.find().sort('-created').populate('user', 'displayName').exec(function(err, donations) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(donations);
    }
  });
};

/**
 * Donation middleware
 */
exports.donationByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Donation is invalid'
    });
  }

  Donation.findById(id).populate('user', 'displayName').exec(function (err, donation) {
    if (err) {
      return next(err);
    } else if (!donation) {
      return res.status(404).send({
        message: 'No Donation with that identifier has been found'
      });
    }
    req.donation = donation;
    next();
  });
};
