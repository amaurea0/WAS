'use strict';

/**
 * The questions service
 */

SERVICES.service('QuestionPostService', ['$http', '$log', '$q', function ($http, $log, $q) {

    // this.get = function () {
    //   return $http.get(API_URL + '/questions?_expand=user');
    // }

    // this.getById = function (id) {
    //   return $http.get(API_URL + '/questions/' + id);
    // }

    // this.getUser = function (userId) {
    //   return $http.get(API_URL + '/users/' + userId);
    // }

    this.save = function (question) {
        var deferred = $q.defer();
        $http.post(API_URL + '/questions', question).then(
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

    // this.delete = function (question) {
    //   return $http.delete(API_URL + '/' + question._id);
    // }

}]);
