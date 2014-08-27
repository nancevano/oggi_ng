var services = angular.module('oggiApp.services');

services.factory('oggiApp.services.loginService', ['$q', 'localStorageService', 'oggiApp.services.apiService', '$rootScope', '$base64', function($q, localStorageService, apiService, $rootScope, $base64) {
    var that = this;

    this.checkIfInLocalStorage = function(){
        var deferred = $q.defer();

        if(localStorageService.get('oggi.usernamepasswordtoken') !== null){
            var token = localStorageService.get('oggi.usernamepasswordtoken');
            var arr = $base64.decode(token).split(':');
            for (var i = 0; i < arr.length; i++)
                arr[i] = arr[i].trim();

            deferred.resolve({
                username: arr[0],
                password: arr[1]
            });
        } else {
            deferred.reject(false);
        }

        return deferred.promise;
    };

    this.checkCredentials = function(data){
        var deferred = $q.defer();

        if(typeof data.username === "undefined"
            || typeof data.password === "undefined"){
                deferred.reject('Please provide username, password and remember');
        }

        var encoded = $base64.encode(data.username + ':' + data.password);

        apiService.checkLoginCredentials(encoded).then(function(user){
            localStorageService.set('oggi.usernamepasswordtoken', encoded);
            deferred.resolve(user);
        },
        function(data, status){
            //FAIL
        });

        return deferred.promise;

    };

    this.doLogin = function(user){
        var deferred = $q.defer();

        $rootScope.user = user;

        return deferred.promise;
    };

    return {
        inLocalStorage: that.checkIfInLocalStorage,
        checkCredentials: function(data){
            var deferred = $q.defer();

            that.checkCredentials(data).then(function(user){
                if(user !== null){
                    deferred.resolve(user);
                } else {
                    deferred.reject(new Error("Username and password incorrect"));
                }
            });

            return deferred.promise;
        },
        doLogin: function(user){
            var deferred = $q.defer();

            that.doLogin(user).then(function(rootscope_user){
                console.log(rootscope_user);
               if(rootscope_user != null){
                   deferred.resolve(rootscope_user);
               }
            });

            return deferred.promise;
        }
    };
}]);