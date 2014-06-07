'use strict';

var app = angular
    .module('oggiNgApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'cn.offCanvas'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/app', {
                templateUrl: 'views/preload.html',
                controller: 'AppCtrl',
                resolve: {
                    appInitialized: appCtrl.initialize
                }
            })
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
            .when('/day', {
                templateUrl: 'views/day.html',
                controller: 'DayCtrl'
            })
            .when('/add', {
                templateUrl: 'views/add.html',
                controller: 'AddCtrl'
            })
            .when('/schedule', {
                templateUrl: 'views/schedule.html',
                controller: 'ScheduleCtrl'
            })
            .when('/class', {
                templateUrl: 'views/class.html',
                controller: 'ClassCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(['$rootScope', '$timeout', '$location', '$window', '$http',
        function($rootScope, $timeout, $location, $window, $http) {
            $rootScope.appInitialized = false;

            $rootScope.$on('$routeChangeStart', function(event, next, current) {
                if (!$rootScope.appInitialized) {
                    $location.path('/app');
                } else if ($rootScope.appInitialized && $location.path() === '/app') {
                    $location.path('/');
                }
            })

            $rootScope.goBack = function() {
                setTimeout(function() {
                    $window.history.back();
                }, 100);
            }
        }
    ]);

/*
    AppCtrl
    =======
    Controller for the App
    ----------------------
    * Load Data Via the services
    * Return the promises
    * Resolve for each route
*/
var appCtrl = app.controller('AppCtrl', ['$scope', '$location', 'appInitialized', '$http', '$rootScope', 'offCanvas',
    function($scope, $location, appInitialized, $http, $rootScope, offCanvas) {
        if (appInitialized) {
            $location.path('/');
        }
    }
]);

appCtrl.initialize = ['$rootScope', '$q', '$timeout',
    function($rootScope, $q, $timeout) {
        var deferred = $q.defer();


        $rootScope.appInitialized = true;
        deferred.resolve(true);

        return deferred.promise;
    }
];

var navCtrl = app.controller('navCtrl', ['offCanvas', '$rootScope',
    function(offCanvas, $rootScope) {
        $rootScope.toggleNav = offCanvas.toggle;
    }
])
    .factory('offCanvas', ['cnOffCanvas',
        function(cnOffCanvas) {
            return cnOffCanvas({
                controller: 'navCtrl',
                controllerAs: 'nav',
                templateUrl: 'views/partials/offcanvas.html'
            })
        }
    ]);
