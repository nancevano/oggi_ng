'use strict';

angular.module('oggiApp')
    .controller('oggiApp.controllers.MessagesCtrl', ['$scope', 'oggiApp.services.apiService', 'oggiApp.services.offlineService', 'imgUrl',
        function($scope, apiService, offlineService, imgUrl) {
            $scope.showReceived = true;
            $scope.imgUrl = imgUrl;

            $scope.init = function(){

                offlineService.messages.get().then(function(messages){
                    $scope.received = messages.received;
                    $scope.sent = messages.sent;
                });

                $scope.loading = true;
                apiService.getUnreadMessages().then(function(messages){
                    offlineService.messages.add.received(messages.received).then(function(newMsg){
                        $scope.newReceived = newMsg;
                    });

                    $scope.loading = false;
                });
            }
        }
    ]);