(function () {
  'use strict';

  // Donations controller
  angular
    .module('donations')
    .controller('DonationsController', DonationsController);

  DonationsController.$inject = ['$scope', '$state', 'Authentication', 'donationResolve'];

  function DonationsController ($scope, $state, Authentication, donation) {
    var vm = this;

    vm.authentication = Authentication;
    vm.donation = donation;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Donation
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.donation.$remove($state.go('donations.list'));
      }
    }

    // Save Donation
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.donationForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.donation._id) {
        vm.donation.$update(successCallback, errorCallback);
      } else {
        vm.donation.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('donations.view', {
          donationId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
