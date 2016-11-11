'use strict';

/**
 * @ngdoc overview
 * @name citasApp
 * @description
 * # citasApp
 *
 * Main module of the application.
 */
angular
  .module('citasApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'mwl.calendar'
  ])
  .controller('principal', function ($scope,$mdSidenav,$location) {
     $scope.abrirCerrarMenu = function () {
       $mdSidenav('left').toggle();
     }

     $scope.abrirvista = function (vista) {
      console.log(vista);
       $location.path(vista);
     }
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/empleados', {
        templateUrl: 'views/empleados.html',
        controller: 'EmpleadosCtrl',
        controllerAs: 'empleados'
      })
      .when('/servicios', {
        templateUrl: 'views/servicios.html',
        controller: 'ServiciosCtrl',
        controllerAs: 'servicios'
      })
      .when('/sucursales', {
        templateUrl: 'views/sucursales.html',
        controller: 'SucursalesCtrl',
        controllerAs: 'sucursales'
      })
      .when('/reservas', {
        templateUrl: 'views/reservas.html',
        controller: 'ReservasCtrl',
        controllerAs: 'reservas'
      })
      .otherwise({
        redirectTo: '/',
      });
  })
  ;
