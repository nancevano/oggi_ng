var services = angular.module('oggiApp.services');
var $format = ".json";
var slugs = {
    authenticate: "authenticated" + $format,
    schedule: {
        day: "schedules/{0}/day" + $format,
        week: "schedules/{0}/week" + $format
    },
    messages: {
        all: '',
        unread: 'authenticated/messages/unread' + $format
    }
};

services.factory('oggiApp.services.apiService', ['$q', '$http', 'apiUrl', function($q, $http, apiUrl) {
    var that = this;

    this.checkLoginCredentials = function(encoded){
        var deferred = $q.defer();

        $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
        $http.get(apiUrl + slugs.authenticate)
            .success(function(data){
                deferred.resolve(data.user);
            })
            .error(function(data, status){
                deferred.reject(data, status);
            });

        return deferred.promise;
    };

    this.getDaySchedule = function(date){
        var deferred = $q.defer();
        var dstr = date.getTime();

        $http.get(apiUrl + slugs.schedule.day.format(dstr))
            .success(function(data){
                deferred.resolve(data.schedules);
            })
            .error(function(data, status){
                deferred.reject(data, data);
            });

        return deferred.promise;
    };

    this.getWeekSchedule = function(date){
        var deferred = $q.defer();
        var dstr = date.getTime();

        $http.get(apiUrl + slugs.schedule.week.format(dstr))
            .success(function(data){
                deferred.resolve(data.schedules);
            })
            .error(function(data, status){
                deferred.reject(data, data);
            });

        return deferred.promise;
    };

    this.getUnreadMessages = function(){
        var deferred = $q.defer();
        $http.get(apiUrl + slugs.messages.unread)
            .success(function(data){
                deferred.resolve(data.messages);
            })
            .error(function(data, status){
                deferred.reject(data, data);
            });

        return deferred.promise;
    };

    return {
        checkLoginCredentials: that.checkLoginCredentials,
        getDaySchedule: that.getDaySchedule,
        getWeekSchedule: that.getWeekSchedule,
        getUnreadMessages: that.getUnreadMessages
    };
}]);

if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}