'use strict';

angular.module('oggiApp.controllers')
    .controller('oggiApp.controllers.DayCtrl', ['$scope',
        function($scope) {
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

            $scope.today = new Date();
            $scope.currentDay = $scope.today.getDate();
            $scope.startYear = $scope.today.getMonth() > 8 ? $scope.today.getFullYear() : $scope.today.getFullYear() - 1;

            $scope.previousDay = function(){
                $scope.today.setDate($scope.today.getDate() - 1);

                if($scope.today.getMonth() == 7 && $scope.today.getDate() == 31) {
                    $scope.today.setYear($scope.startYear + 1);
                }

                $scope.setDayString();
            };

            $scope.nextDay = function(){
                $scope.today.setDate($scope.today.getDate() + 1);

                if($scope.today.getMonth() == 8 && $scope.today.getDate() == 1) {
                    $scope.today.setYear($scope.startYear);
                }

                $scope.setDayString();
            };

            $scope.setDayString = function(){
                var result = '';
                result += $scope.daysShort[$scope.today.getDay()];
                result += ' ' + $scope.today.getDate();
                result += ' ' + $scope.months[$scope.today.getMonth()];
                result += ' ' + $scope.today.getFullYear();

                $scope.currentDay = result;
            }
        }
    ]);