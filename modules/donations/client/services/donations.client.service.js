//Donations service used to communicate Donations REST endpoints
(function () {
  'use strict';

  angular
    .module('donations')
    .factory('DonationsService', DonationsService);

  DonationsService.$inject = ['$resource'];

  function DonationsService($resource) {
    return $resource('api/donations/:donationId', {
      donationId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
