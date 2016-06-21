(function () {
  'use strict';

  angular
    .module('donations')
    .controller('DonationsListController', DonationsListController);

  DonationsListController.$inject = ['DonationsService'];

  function DonationsListController(DonationsService) {
    var vm = this;

    vm.donations = DonationsService.query();
  }
})();
