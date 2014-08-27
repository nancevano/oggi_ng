var services = angular.module('oggiApp.services');
var $format = ".json"
var slugs = {
    authenticate: "authenticated" + $format,
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

    return {
        checkLoginCredentials: that.checkLoginCredentials
    };
}]);