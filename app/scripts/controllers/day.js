'use strict';

angular.module('oggiApp.controllers')
    .controller('oggiApp.controllers.DayCtrl', ['$scope', '$http', '$rootScope', '$routeParams',
        function($scope, $http, $rootScope, $routeParams) {
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

            $scope.daysShort = [
                'Zo',
                'MA',
                'DI',
                'WO',
                'DO',
                'VR',
                'ZA'
            ];

            $scope.today = typeof($routeParams.date) !== 'undefined' ? new Date($routeParams.date) : new Date();
            $scope.currentDay = $scope.today.getDate();
            $scope.startYear = $scope.today.getMonth() > 8 ? $scope.today.getFullYear() : $scope.today.getFullYear() - 1;



            $scope.previousDay = function(){
                $scope.today.setDate($scope.today.getDate() - 1);

                if($scope.today.getMonth() == 7 && $scope.today.getDate() == 31) {
                    $scope.today.setYear($scope.startYear + 1);
                }

                $scope.setDayString();
                $scope.createSubjects();
            };

            $scope.nextDay = function(){
                $scope.today.setDate($scope.today.getDate() + 1);

                if($scope.today.getMonth() == 8 && $scope.today.getDate() == 1) {
                    $scope.today.setYear($scope.startYear);
                }

                $scope.setDayString();
                $scope.createSubjects();
            };

            $scope.setDayString = function(){
                var result = '';
                result += $scope.daysShort[$scope.today.getDay()];
                result += ' ' + $scope.today.getDate();
                result += ' ' + $scope.months[$scope.today.getMonth()];
                result += ' ' + $scope.today.getFullYear();

                $scope.currentDay = result;
            };

            $scope.subjectsToday = [];
            $scope.createSubjects = function(){
                $scope.subjectsToday = [];

                var link = $scope.today.getDate() + '/' + ($scope.today.getMonth() + 1) + '/' + $scope.today.getFullYear();
                $http({method: 'POST', url: $rootScope.URLAPI + '/calendar/' + link, data: {user: $rootScope.user.id}}).
                    success(function(data, status) {
                        if(data != null){
                            var courses = $.map(data, function(v, i){
                                return [v];
                            });
                            courses = courses[2];
                            courses.sort(function (a, b) {
                                return new Date(a.schedule.timeslot.start) - new Date(b.schedule.timeslot.start);
                            });

                            $.each(courses, function(i, v){
                                var t = new Date(v.schedule.timeslot.start);
                                var hours = ('0' + t.getHours()).slice(-2);
                                var minutes = ('0' + t.getMinutes()).slice(-2);

                                $scope.subjectsToday.push({
                                    time: hours + ':' + minutes,
                                    name: v.schedule.course.name.substring(0, 3),
                                    message: v.subject.message,
                                    task: '/'
                                });
                            });
                        }
                    }).
                    error(function(data, status) {
                        $scope.errors = [];
                        for(var i=0; i < data.text.length; i++){
                            $scope.errors.push(data.text[i]);
                        }
                    }
                );
            };
        }
    ]);