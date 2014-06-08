'use strict';

angular.module('oggiApp.controllers', []);
angular.module('oggiApp.services', []);

var app = angular
    .module('oggiApp', [
        'oggiApp.controllers',
        'oggiApp.services',
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
                controller: 'oggiApp.controllers.AppCtrl',
                resolve: {
                    appInitialized: appCtrl.initialize
                }
            })
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'oggiApp.controllers.MainCtrl'
            })
            .when('/month', {
                templateUrl: 'views/month.html',
                controller: 'oggiApp.controllers.MonthCtrl'
            })
            .when('/week', {
                templateUrl: 'views/week.html',
                controller: 'oggiApp.controllers.WeekCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'oggiApp.controllers.LoginCtrl'
            })
            .when('/day', {
                templateUrl: 'views/day.html',
                controller: 'oggiApp.controllers.DayCtrl'
            })
            .when('/add', {
                templateUrl: 'views/add.html',
                controller: 'oggiApp.controllers.AddCtrl'
            })
            .when('/schedule', {
                templateUrl: 'views/schedule.html',
                controller: 'oggiApp.controllers.ScheduleCtrl'
            })
            .when('/class', {
                templateUrl: 'views/class.html',
                controller: 'oggiApp.controllers.ClassCtrl'
            })
            .when('/conversations', {
                templateUrl: 'views/conversations.html',
                controller: 'ConversationsCtrl'
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
var appCtrl = app.controller('oggiApp.controllers.AppCtrl', ['$scope', '$location', 'appInitialized', '$http', '$rootScope', 'offCanvas',
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
appCtrl.getGeoloc = ['$q', 'oggiApp.services.GeolocSrvc', function($q, GeolocSrvc){
    var deferred = $q.defer();

    GeolocSrvc.getGeoLoc().then(
        function(data){
            deferred.resolve(data);
        },
        function(error){
            deferred.reject(error);
        }
    );
    return deferred.promise;
}];


/*
 NavCtrl
 =======
 Controller for the App
 ----------------------
 * Manages offcanvas navigation
 */
var navCtrl = app.controller('oggiApp.controllers.navCtrl', ['offCanvas', '$rootScope',
    function(offCanvas, $rootScope) {
        $rootScope.toggleNav = offCanvas.toggle;
    }
])
    .factory('offCanvas', ['cnOffCanvas',
        function(cnOffCanvas) {
            return cnOffCanvas({
                controller: 'oggiApp.controllers.navCtrl',
                controllerAs: 'nav',
                templateUrl: 'views/partials/offcanvas.html'
            })
        }
    ]);
