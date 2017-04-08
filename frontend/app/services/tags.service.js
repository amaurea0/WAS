'use strict';

const TAG_URL = "http://localhost:3000/tags";


SERVICES.service('TagsService', ['$http', '$log', '$q', function ($http, $log, $q) {


    this.getTags = function () {
        var deferred = $q.defer();

        $http.get(TAG_URL).then(function (response) {
            deferred.resolve(response.data);
        }, function (error) {
            deferred.reject(error);
            $log.error(error);
        });
        return deferred.promise;
    };

    this.getTagId = (tag) => {
        var deferred = $q.defer();

        $http.get(TAG_URL + '?name=' + tag).then(function (response) {
            deferred.resolve(response.data);
        }, function (error) {
            deferred.reject(error);
            $log.error(error);
        });
        return deferred.promise;
    };

}]);
