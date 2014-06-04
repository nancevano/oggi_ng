'use strict';

angular
  .module('oggiNgApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
       .when('/month', {
        templateUrl: 'views/month.html',
        controller: 'MonthCtrl'
      })
        .when('/week', {
        templateUrl: 'views/week.html',
        controller: 'WeekCtrl'
      })
          .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })

      .otherwise({
        redirectTo: '/'
      });
  });
