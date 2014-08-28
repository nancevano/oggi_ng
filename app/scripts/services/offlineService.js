var services = angular.module('oggiApp.services');

services.factory('oggiApp.services.offlineService', ['$q', 'localStorageService', 'imgUrl',
    function($q, ls, imgUrl) {
    var that = this;

    function getVar(){ return ls.get('oggi') }
    function setVar(obj){ ls.set('oggi', obj); return this; }

    this.init = function(){
        if(typeof getVar() === "undefined" || getVar() === null)
            setVar({});
    };

    this.addReceivedMessages = function(messages) {
        var deferred = $q.defer();
        var res = [];
        var obj = getVar();

        obj.messages = typeof obj.messages == "undefined" ?  {} : obj.messages;
        obj.messages.received = typeof obj.messages.received == "undefined" ?  [] : obj.messages.received;

        if(!messages instanceof Array)
            deferred.reject('Must be array!');

        var message;
        for(var i = 0; i < messages.length; i++){
            message = messages[i];
            var temp = obj.messages.received;

            //check if not in local storage already
            temp = $.grep(temp, function(value, i){
                return value.id === message.id
            });

            console.log(temp);
            if(temp.length === 0){
                obj.messages.received.push(message);
                res.push(message);
            }
        }

        setVar(obj);
        deferred.resolve(res);

        return deferred.promise;
    };

    this.getMessages = function(){
        var deferred = $q.defer();
        var obj = getVar();
        console.log(obj);

        if(typeof obj.messages === "undefined" || $.isEmptyObject(obj.messages))
            deferred.reject('No Messages found');
        else
            deferred.resolve(obj.messages);

        return deferred.promise;
    };

    this.deleteMessage = function(id){

    };

    return {
        init: this.init,
        messages: {
            add: {
                received: that.addReceivedMessages,
                sent: that.addSentMessages
            },
            delete: that.deleteMessage,
            get: that.getMessages
        }
    };
}]);