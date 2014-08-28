'use strict';

angular.module('oggiApp.controllers', []);
angular.module('oggiApp.services', []);
angular.module('oggiApp.filters', []);
angular.module('oggiApp.settings', []);

var app = angular
    .module('oggiApp', [
        'oggiApp.controllers',
        'oggiApp.services',
        'oggiApp.filters',
        'oggiApp.settings',
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
                controller: 'oggiApp.controllers.AppCtrl'
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
            .when('/day/:date?', {
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
            .when('/messages', {
                templateUrl: '../views/messages.html',
                controller: 'oggiApp.controllers.MessagesCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }])
    .run(['$rootScope', '$timeout', '$location', '$window', '$http',
        function($rootScope, $timeout, $location, $window) {
            $rootScope.user = null;
            $rootScope.appInitialized = false;
            $rootScope.URLAPI = "http://localhost:8080/oggi_bo/web/app_dev.php/api";

            $rootScope.goBack = function() {
                setTimeout(function() {
                    $window.history.back();
                }, 100);
            };

            //Initialize cache
            $('body').imagesLoaded(function($images, $proper, $broken ) {
                // see console output for debug info
                ImgCache.options.debug = true;
                ImgCache.options.usePersistentCache = true;

                ImgCache.init(function() {
                    // 1. cache images
                    if(typeof $proper !== 'undefined'){
                        for (var i = 0; i < $proper.length; i++) {
                            ImgCache.cacheFile($($proper[i]).attr('src'));
                        }
                    }
                    // 2. broken images get replaced
                    if(typeof $broken !== 'undefined'){
                    for (var i = 0; i < $broken.length; i++) {
                        ImgCache.useCachedFile($($broken[i]));
                    }

                });
            });

            $rootScope.$on('$routeChangeStart', function(event, next, current) {
                if (!$rootScope.appInitialized && $rootScope.user === null && $location.path() !== '/login') {
                    $location.path('/app');
                } else if($rootScope.appInitialized && $rootScope.user === null && $location.path() !== '/login'){

                }
            });
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
var appCtrl = app.controller('oggiApp.controllers.AppCtrl', ['$rootScope', '$q', '$timeout', '$http', '$location', 'oggiApp.services.offlineService', 'oggiApp.services.loginService',
    function($rootScope, $q, $timeout, $http, $location, offlineService, loginService) {

        offlineService.init();

        loginService.inLocalStorage().then(function(inLocalStorage){
            loginService.checkCredentials(inLocalStorage).then(function(data){
                if(!!data){
                    loginService.doLogin(data);
                    $location.path('/')
                }
            }, function(){
                $location.path('/login');
            });
        },function() {
            $location.path('/login');
        });
    }
]);

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
 Controller for the Z
 ----------------------
 * Manages offcanvas navigation
 */
var navCtrl = app.controller('navCtrl', ['offCanvas', '$scope', '$rootScope',
    function(offCanvas, $scope, $rootScope) {
        $rootScope.$watch('user', function(){
            $scope.user = $rootScope.user;
        }, true);

        this.toggle = function(){
            offCanvas.toggle();

            if ($('body').hasClass('is-off-canvas-opened')) {
                $('.off-canvas__nav').animate({left: '0px'});
                $('.off-canvas__container').animate({left: '250px'});
            }
            else {
                $('.off-canvas__nav').animate({left: '-250px'});
                $('.off-canvas__container').animate({left: '0px'});
            }
        };
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
