'use strict';

angular.module('oggiApp.controllers')
    .controller('oggiApp.controllers.LoginCtrl', ['$scope','$base64', '$http', 'localStorageService', '$rootScope',
        function($scope, $base64, $http, localStorageService, $rootScope) {
            $scope.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];

            $scope.login = function(){
                var usr = $scope.user.username;
                var password = $scope.user.pwd;

                var encoded = $base64.encode(usr + ':' + password);

                $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
                //$rootScope.refreshUser();

                $http({method: 'GET', url: $rootScope.URLAPI + '/user/credentials'}).
                    success(function(data, status) {
                        if(data != null){
                            localStorageService.set('user', encoded);
                            $rootScope.user = data;
                            $location.path('/');
                        }

                    }).
                    error(function(data, status) {
                        $scope.errors = [];
console.log(data);
                        for(var i=0; i < data.text.length; i++){
                            $scope.errors.push(data.text[i]);
                        }
                    })
                ;
            }
        }
    ]);