'use strict';

angular.module('oggiApp')
    .controller('ConversationsCtrl', ['$scope',
        function($scope) {
            $scope.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
        }
    ]);