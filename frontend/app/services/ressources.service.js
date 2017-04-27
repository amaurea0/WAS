'use strict';

const URL_RESS = "http://localhost:3000/ressources";


SERVICES.service('ressourcesService', ['$http', '$log', '$q', function ($http, $log, $q) {

    
    this.getRessourceTag= (tagid) => {
        var deferred = $q.defer();
        $http.get(URL_RESS + '?tagId=' + tagid).then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (error) {
                deferred.reject(error);
                $log.error(error);
            }
        );
        return deferred.promise;
    };

    this.save = function (ressource) {
        var deferred = $q.defer();
        $http.post(URL_RESS, ressource).then((response) => {
            deferred.resolve(response.data);
        }).catch((error) => {
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

    this.saveTaglink = function (question) {
        var deferred = $q.defer();
        $http.post(TAGLNK_URL, question).then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (error) {
                deferred.reject(error);
                $log.error(error);
            }
        );
        return deferred.promise;
    };

}]);