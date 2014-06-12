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
        'cn.offCanvas',
        'LocalStorageModule',
        'base64'
    ])
    .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        $httpProvider.defaults.useXDomain = true;//Cross Domain Calls --> Ok Ready
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
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
            }).when('/contact', {
                templateUrl: '../views/contact.html',
                controller: 'ContactCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }])
    .run(['$rootScope', '$timeout', '$location', '$window', '$http',
        function($rootScope, $timeout, $location, $window, $http) {
            $rootScope.user = null;
            $rootScope.appInitialized = false;
            $rootScope.URLAPI = "http://localhost:8080/oggi_bo/web/app_dev.php/api";

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

            /*$rootScope.refreshUser = function(){
                $http({method: 'GET', url: $rootScope.URLAPI + "/user/info"})
                    .success(function(data, status, headers, config) {
                        if(data !== null){
                            $rootScope.user = data;
                        }
                    })
                    .error(function(data, status, headers, config) {
                        alert(error);
                    });
            }*/
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
var appCtrl = app.controller('oggiApp.controllers.AppCtrl', ['$scope', '$location', 'appInitialized', '$http', '$rootScope', 'localStorageService', 'offCanvas',
    function($scope, $location, appInitialized, $http, $rootScope, localStorageService, offCanvas) {
        if (appInitialized) {
            $location.path('/');
        }

        if(localStorageService.get('user') !== null){
            var user = localStorageService.get('user');
            $http.defaults.headers.common.Authorization = 'Basic ' + user;
            $http({method: 'GET', url: $rootScope.URLAPI + "/user/credentials"})
                .success(function(data, status, headers, config) {
                    if(data !== null){
                        $rootScope.user = data;
                    }
                })
                .error(function(data, status, headers, config) {
                    alert(error);
                });
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
