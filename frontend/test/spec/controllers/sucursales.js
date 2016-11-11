'use strict';

describe('Controller: SucursalesCtrl', function () {

  // load the controller's module
  beforeEach(module('citasApp'));

  var SucursalesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SucursalesCtrl = $controller('SucursalesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SucursalesCtrl.awesomeThings.length).toBe(3);
  });
});
