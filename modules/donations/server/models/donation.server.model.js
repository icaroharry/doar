'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Donation Schema
 */
var DonationSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Donation name',
    trim: true
  },
  description: {
    type: String,
    required: 'Please fill Donation description',
    trim: true
  },
  repeat: {
    type: Boolean,
    required: 'Please fill Donation repeat',
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Donation', DonationSchema);
