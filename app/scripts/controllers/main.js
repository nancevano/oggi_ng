'use strict';

angular.module('oggiApp.controllers')
    .controller('oggiApp.controllers.MainCtrl', ['$scope', 'oggiApp.services.WeatherSrvc', '$rootScope', '$interval', '$timeout',
        function($scope, WeatherSrvc, $rootScope, $interval, $timeout) {
            $scope.weather;

            $scope.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];

            $scope.months = [
                'Januari',
                'Februari',
                'Maart',
                'April',
                'Mei',
                'Juni',
                'Juli',
                'Augustus',
                'September',
                'Oktober',
                'November',
                'December'
            ];

            $scope.days = [
                'Zondag',
                'Maandag',
                'Dinsdag',
                'Woensdag',
                'Donderdag',
                'Vrijdag',
                'Zaterdag'
            ];

            $scope.coursesToday = [];
            $scope.currentTime = '00:00';
            $scope.currentDate = '';

            $scope.picture = '';

            $scope.init_informations = function(){
                //$scope.weather = WeatherSrvc.getCurrentWeather();
            };

            $scope.setUserImage = function(){
                if(typeof($rootScope.user.picture) != 'undefined') {
                    $scope.picture = $rootScope.user.picture;
                }
                else $scope.picture = '../images/default-user-icon-profile.png';
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
                $scope.currentDate = $scope.days[dayIndex] + ' ' + day + ' '+ $scope.months[month];
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