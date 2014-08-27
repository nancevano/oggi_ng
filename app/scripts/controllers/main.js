'use strict';

angular.module('oggiApp.controllers')
    .controller('oggiApp.controllers.MainCtrl', ['$scope', 'oggiApp.services.WeatherSrvc', '$rootScope', '$interval', '$timeout', 'imgUrl', 'calendarData',
        function($scope, WeatherSrvc, $rootScope, $interval, $timeout, imgUrl, calendarData) {
            $scope.imgUrl = imgUrl;

            $scope.coursesToday = [];
            $scope.currentTime = '00:00';
            $scope.currentDate = '';

            $scope.picture = '';

            $scope.init_informations = function(){
                //$scope.weather = WeatherSrvc.getCurrentWeather();
            };

            $scope.initClock = function(){
                var date = new Date();
                var seconds = date.getSeconds();

                $scope.clock();
                $timeout(function(){
                    $scope.clock();
                    $interval($scope.clock, 60000);
                }, (60 - seconds) * 1000);
            };

            $scope.clock = function(){
                var date = new Date();
                var hours = ('0' + date.getHours()).slice(-2);
                var minutes = ('0' + date.getMinutes()).slice(-2);

                var day = date.getDate();
                var month = date.getMonth();
                var dayIndex = date.getDay();

                $scope.currentTime = hours + ':' + minutes;
                $scope.currentDate = calendarData.days[dayIndex] + ' ' + day + ' '+ calendarData.months[month];
            };
        }
    ]);