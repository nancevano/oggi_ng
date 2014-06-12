'use strict';

angular.module('oggiApp.controllers')
    .controller('oggiApp.controllers.MainCtrl', ['$scope', 'oggiApp.services.WeatherSrvc', '$rootScope',
        function($scope, WeatherSrvc, $rootScope) {
            $scope.weather;

            $scope.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];

            $scope.coursesToday = [];

            $scope.init_informations = function(){
                //$scope.weather = WeatherSrvc.getCurrentWeather();
            };

            $scope.createDailySchedule = function(){
                var date = new Date();
                var day = date.getDay() + 1;

                var courseDay = $.grep($rootScope.user.klas.schedules, function(a){
                    return a.day.id == day;
                });

                courseDay.sort(function (a, b) {
                    return new Date(a.timeslot.start) - new Date(b.timeslot.start);
                });

                $.each(courseDay, function(k, v){
                    var name = v.course.name;
                    var start = new Date(v.timeslot.start);
                    var time = ('0' + start.getHours()).slice(-2) + ':' + ('0' + start.getMinutes()).slice(-2);
                    var classroom = 'B1';

                    $scope.coursesToday.push({name: name, start: time, classroom: classroom});
                });
            };
        }
    ]);