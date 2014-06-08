'use strict';

angular.module('oggiApp.controllers')
    .controller('oggiApp.controllers.ClassCtrl', ['$scope',
        function($scope) {
            $scope.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
        }
    ]);