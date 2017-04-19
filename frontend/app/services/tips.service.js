'use strict';

SERVICES.service('TipsService', ['$http', '$log', '$q', function ($http, $log, $q) {

    this.getTips = () => {
        var deferred = $q.defer();

        $http.get(TIPS_URL).then((response) => {
            deferred.resolve(response.data);
        }).catch((error) => {
            deferred.reject(error);
            $log.error(error + ":server couldn't fetch items...");
        });
        return deferred.promise
    }

    this.postTip = (tip) => {
        var deferred = $q.defer();

        $http.post(TIPS_URL, tip).then((response) => {
            deferred.resolve(response.data);
        }).catch((error) => {
            deferred.reject(error)
            $log.error(error);
        })

        return deferred.promise;
    }
}])