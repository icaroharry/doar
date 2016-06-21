'use strict';

describe('Donations E2E Tests:', function () {
  describe('Test Donations page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/donations');
      expect(element.all(by.repeater('donation in donations')).count()).toEqual(0);
    });
  });
});
