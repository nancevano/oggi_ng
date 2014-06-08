(function(){
    'use strict';
    var translations = {
        "clouds" : [
            {
                'lang': 'en',
                'translation': 'clouds'
            },
            {
                'lang': 'nl',
                'translation': 'bewolkt'
            }
        ]
    };

    var services = angular.module('oggiApp.services');

    services.factory("oggiApp.services.WeatherSrvc", ['$q', '$rootScope', '$http', 'oggiApp.services.GeolocSrvc', function ($q, $rootScope, $http, geolocSrvc) {
        var that = this;

        this.getTranslation = function(term, language){
            var deferred = $q.defer();

            if(translations[term] !== null){

            } else {
                deferred.reject("No translation could be found for \"" + term + "\"");
            }
        };

        this.getWeather = function(vars){
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url:"//api.openweathermap.org/data/" +
                    "2.5/weather" +
                    "?units=metric" +
                    "&lat=" + vars.coords.latitude +
                    "&lon=" + vars.coords.longitude +
                    "&lang=nl"
            }).success(function(data, status){
                if(status === 200){
                    deferred.resolve(data);
                } else {
                    deferred.reject(new Error("No connection could be established with openweathermap API"));
                }
            });
        };

        that.getGeolocation = function(){
            return geolocSrvc.getGeoLoc();
        };


        this.translate = function (data, language) {
            that.getTranslation(data, language);
        };

        return {
            getCurrentWeather:function(){
                var deferred = $q.defer();

                that.getGeolocation().then(
                    function(data){
                        if(data !== null){
                            that.getWeather(data).then(function(inf){
                                console.log(inf);
                            });
                        } else {
                            deferred.reject(new Error("Your current position could not be established."))
                        }
                    }
                );
                /*that.getWeather().then(
                    function(data){
                        if(data !== null){
                            deferred.resolve(data);
                        } else {
                            deferred.reject(new Error("No weather today."));
                        }
                    }
                );*/

                return deferred.promise;
            }
        }
    }]);
})();
