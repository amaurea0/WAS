'use strict';

const QST_URL = "http://localhost:3000/questions";


SERVICES.service('QuestionsService', ['$http', '$log', '$q', function ($http, $log, $q) {

    this.save = function (question) {
        var deferred = $q.defer();
        $http.post(QST_URL, question).then(
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

    this.getQuestions = () => {
      return $http.get(QST_URL + '?_expand=user');
    }

}]);
