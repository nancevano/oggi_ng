'use strict';

angular.module('oggiApp.controllers')
    .controller('oggiApp.controllers.WeekCtrl', ['$scope', '$rootScope', '$http', 'calendarData', 'oggiApp.services.apiService',
        function($scope, $rootScope, $http, calendarData, apiService) {

            Date.prototype.getWeekNumber = function(){
                var d = new Date(+this);
                d.setHours(0,0,0);
                d.setDate(d.getDate()+4-(d.getDay()||7));
                return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
            };

            $scope.today = new Date();
            $scope.currentWeek = $scope.today.getWeekNumber();
            $scope.currentYear = $scope.today.getFullYear();
            $scope.startYear = $scope.today.getMonth() > 8 ? $scope.currentYear : $scope.currentYear - 1;

            $scope.previousWeek = function(){
                $scope.currentMonday.setDate($scope.currentMonday.getDate() - 7);
                $scope.currentWeek = $scope.currentMonday.getWeekNumber();

                switch($scope.currentMonday.getMonth()){
                    case 0:
                        $scope.currentYear = $scope.startYear;
                        break;
                    case 8:
                        $scope.currentYear = $scope.startYear + 1;
                        break;
                }
                $scope.currentMonday.setYear($scope.currentYear);
                $scope.setCurrentMonday($scope.currentMonday);

                $scope.buildWeekCalendar();
            };

            $scope.nextWeek = function(){
                $scope.currentMonday.setDate($scope.currentMonday.getDate() + 7);
                $scope.currentWeek = $scope.currentMonday.getWeekNumber();

                switch($scope.currentMonday.getMonth()){
                    case 0:
                        $scope.currentYear = $scope.startYear + 1;
                        break;
                    case 8:
                        $scope.currentYear = $scope.startYear;
                        break;
                }
                $scope.currentMonday.setYear($scope.currentYear);
                $scope.setCurrentMonday($scope.currentMonday);

                $scope.buildWeekCalendar();
            };

            $scope.buildWeekCalendar = function(){
                $scope.daysInWeek = [];

                var curr_day = $scope.currentMonday.getDate();
                var curr_month = $scope.currentMonday.getMonth();
                var nDays = new Date($scope.currentMonday.getFullYear(), $scope.currentMonday.getMonth() + 1, 0).getDate();

                for(var i = 0; i < 7; i++){
                    var dtd;
                    var mtd;

                    if(curr_day + i > nDays){
                        dtd = curr_day = 1;
                        mtd = curr_month + 1 > 11 ? 0 : curr_month + 1;
                        curr_month = mtd;
                    }
                    else {
                        dtd = curr_day + i;
                        mtd = curr_month;
                    }

                    $scope.daysInWeek.push({day: dtd, month: calendarData.monthsShort[mtd], monthIndex: (mtd + 1) < 10 ? "0" + (mtd + 1) : (mtd + 1), year:$scope.currentYear});
                }
            };

            $scope.setCurrentMonday = function(cd){
                var d = typeof(cd) === 'undefined' ? new Date() : cd;
                $scope.today = d;

                d.setDate(d.getDate() - (d.getDay() + 6) % 7);
                $scope.currentMonday = d;
            };

            $scope.buildWeekSchedule = function(){
                $scope.weekSchedule = [];
                var url = $rootScope.URLAPI + '/calendar/week/' + $scope.currentWeek + '/' + $scope.currentYear;


                apiService.getWeekSchedule($scope.today).then(function(days){
                    for(var i = 0; i < days.length; i++){
                        var day = days[i];

                        for(var y = 0; y < day.length; y++){
                            var timeslot = day[y].schedule.timeslot;
                            var schedule_day = day[y].schedule.day

                            if(typeof $scope.weekSchedule[timeslot - 1] == "undefined"){
                                $scope.weekSchedule[timeslot - 1] = [];
                            }
                            $scope.weekSchedule[timeslot - 1][schedule_day - 1] = day[y];
                        }
                    }

                    console.log($scope.weekSchedule)
                });

            };
        }
    ]);