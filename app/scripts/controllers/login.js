'use strict';

angular.module('oggiApp.controllers')
    .controller('oggiApp.controllers.LoginCtrl', ['$scope','$base64', '$http', 'localStorageService', '$rootScope', '$location', 'oggiApp.services.loginService',
        function($scope, $base64, $http, localStorageService, $rootScope, $location, loginService) {
            $scope.loginData = {};
            $scope.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];

            $scope.login = function(){
                loginService.checkCredentials($scope.loginData).then(function(data){
                    if(!!data){
                        loginService.doLogin(data).then(function(){
                            $location.path('/')
                        });
                    }
                }, function(){
                    //TODO: SHOW ERROR ON FAIL
                });
            }
        }
    ]);