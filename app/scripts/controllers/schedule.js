'use strict';

angular.module('oggiApp.controllers')
    .controller('oggiApp.controllers.ScheduleCtrl', ['$scope', '$rootScope',
        function ($scope, $rootScope) {
            $scope.awesomeThings = [
              'HTML5 Boilerplate',
              'AngularJS',
              'Karma'
            ];

            $scope.courseDays = [
                'Maandag',
                'Dinsdag',
                'Woensdag',
                "Donderdag",
                'Vrijdag'
            ];

            $scope.courses = [];
            $scope.dayIndex = 0;
            $scope.dayName = '';

            $scope.setCurrentDay = function(){
                var date = new Date();
                var day = date.getDay() - 1;

                $scope.dayIndex = day;
                $scope.dayName = $scope.courseDays[day];
            };

            $scope.previousDay = function(){
                $scope.dayIndex = $scope.dayIndex != 0 ? $scope.dayIndex - 1 : 4;
                $scope.dayName = $scope.courseDays[$scope.dayIndex];

                $scope.createSchedule();
            };

            $scope.nextDay = function(){
                $scope.dayIndex = $scope.dayIndex != 4 ? $scope.dayIndex + 1 : 0;
                $scope.dayName = $scope.courseDays[$scope.dayIndex];
console.log($scope.dayIndex);
                $scope.createSchedule();
            };

            $scope.createSchedule = function(){
                $scope.courses = [];

                var courseDay = $.grep($rootScope.user.klas.schedules, function(a){
                    return a.day.id == $scope.dayIndex + 1;
                });

                courseDay.sort(function (a, b) {
                    return new Date(a.timeslot.start) - new Date(b.timeslot.start);
                });

                $.each(courseDay, function(k, v){
                    var name = v.course.name;
                    var start = new Date(v.timeslot.start);
                    var time = ('0' + start.getHours()).slice(-2) + ':' + ('0' + start.getMinutes()).slice(-2);
                    var classroom = 'B1';

                    $scope.courses.push({name: name, start: time, classroom: classroom});
                });
            };
        }
    ]
);
