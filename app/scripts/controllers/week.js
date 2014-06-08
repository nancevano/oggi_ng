'use strict';

angular.module('oggiApp.controllers')
    .controller('oggiApp.controllers.WeekCtrl', ['$scope',
        function($scope) {
            $scope.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];

            Date.prototype.getWeekNumber = function(){
                var d = new Date(+this);
                d.setHours(0,0,0);
                d.setDate(d.getDate()+4-(d.getDay()||7));
                return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
            };

            $scope.today = new Date();
            $scope.fWeekDay = $scope.today.setDate($scope.today.getDate() + 4 - ($scope.today.getDay() || 7));
            $scope.currentWeek = $scope.fWeekDay.getWeekNumber();

            $scope.previousWeek = function(){
                console.log($scope.fWeekDay);
            };

            $scope.nextWeek = function(){

            };
        }
    ]);