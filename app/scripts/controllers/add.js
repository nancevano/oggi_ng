'use strict';

angular.module('oggiApp.controllers')
    .controller('oggiApp.controllers.AddCtrl', ['$scope',
        function($scope) {
            $scope.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
        }
    ]);