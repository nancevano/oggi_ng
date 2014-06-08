'use strict';

angular.module('oggiApp.controllers')
    .controller('oggiApp.controllers.WeekCtrl', ['$scope',
        function($scope) {
            $scope.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
        }
    ]);