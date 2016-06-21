(function () {
  'use strict';

  angular
    .module('donations')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('donations', {
        abstract: true,
        url: '/donations',
        template: '<ui-view/>'
      })
      .state('donations.list', {
        url: '',
        templateUrl: 'modules/donations/client/views/list-donations.client.view.html',
        controller: 'DonationsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Donations List'
        }
      })
      .state('donations.create', {
        url: '/create',
        templateUrl: 'modules/donations/client/views/form-donation.client.view.html',
        controller: 'DonationsController',
        controllerAs: 'vm',
        resolve: {
          donationResolve: newDonation
        },
        data: {
          roles: ['ngo', 'admin'],
          pageTitle : 'Donations Create'
        }
      })
      .state('donations.edit', {
        url: '/:donationId/edit',
        templateUrl: 'modules/donations/client/views/form-donation.client.view.html',
        controller: 'DonationsController',
        controllerAs: 'vm',
        resolve: {
          donationResolve: getDonation
        },
        data: {
          roles: ['ngo', 'admin'],
          pageTitle: 'Edit Donation {{ donationResolve.name }}'
        }
      })
      .state('donations.view', {
        url: '/:donationId',
        templateUrl: 'modules/donations/client/views/view-donation.client.view.html',
        controller: 'DonationsController',
        controllerAs: 'vm',
        resolve: {
          donationResolve: getDonation
        },
        data:{
          pageTitle: 'Donation {{ articleResolve.name }}'
        }
      });
  }

  getDonation.$inject = ['$stateParams', 'DonationsService'];

  function getDonation($stateParams, DonationsService) {
    return DonationsService.get({
      donationId: $stateParams.donationId
    }).$promise;
  }

  newDonation.$inject = ['DonationsService'];

  function newDonation(DonationsService) {
    return new DonationsService();
  }
})();
