(function () {
  'use strict';

  describe('Donations Route Tests', function () {
    // Initialize global variables
    var $scope,
      DonationsService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _DonationsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      DonationsService = _DonationsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('donations');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/donations');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          DonationsController,
          mockDonation;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('donations.view');
          $templateCache.put('modules/donations/client/views/view-donation.client.view.html', '');

          // create mock Donation
          mockDonation = new DonationsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Donation Name'
          });

          //Initialize Controller
          DonationsController = $controller('DonationsController as vm', {
            $scope: $scope,
            donationResolve: mockDonation
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:donationId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.donationResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            donationId: 1
          })).toEqual('/donations/1');
        }));

        it('should attach an Donation to the controller scope', function () {
          expect($scope.vm.donation._id).toBe(mockDonation._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/donations/client/views/view-donation.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          DonationsController,
          mockDonation;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('donations.create');
          $templateCache.put('modules/donations/client/views/form-donation.client.view.html', '');

          // create mock Donation
          mockDonation = new DonationsService();

          //Initialize Controller
          DonationsController = $controller('DonationsController as vm', {
            $scope: $scope,
            donationResolve: mockDonation
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.donationResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/donations/create');
        }));

        it('should attach an Donation to the controller scope', function () {
          expect($scope.vm.donation._id).toBe(mockDonation._id);
          expect($scope.vm.donation._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/donations/client/views/form-donation.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          DonationsController,
          mockDonation;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('donations.edit');
          $templateCache.put('modules/donations/client/views/form-donation.client.view.html', '');

          // create mock Donation
          mockDonation = new DonationsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Donation Name'
          });

          //Initialize Controller
          DonationsController = $controller('DonationsController as vm', {
            $scope: $scope,
            donationResolve: mockDonation
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:donationId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.donationResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            donationId: 1
          })).toEqual('/donations/1/edit');
        }));

        it('should attach an Donation to the controller scope', function () {
          expect($scope.vm.donation._id).toBe(mockDonation._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/donations/client/views/form-donation.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
