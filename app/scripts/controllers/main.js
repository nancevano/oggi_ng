'use strict';

angular.module('oggiApp.controllers')
    .controller('oggiApp.controllers.MainCtrl', ['$scope', 'oggiApp.services.WeatherSrvc',
        function($scope, WeatherSrvc) {
            $scope.weather;

            $scope.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];

            $scope.init_informations = function(){
                $scope.weather = WeatherSrvc.getCurrentWeather();
            };
        }
    ]);