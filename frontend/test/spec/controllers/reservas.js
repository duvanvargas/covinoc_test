'use strict';

describe('Controller: ReservasCtrl', function () {

  // load the controller's module
  beforeEach(module('citasApp'));

  var ReservasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReservasCtrl = $controller('ReservasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ReservasCtrl.awesomeThings.length).toBe(3);
  });
});
