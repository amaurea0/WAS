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
    this.getQuestionsTag = () => {
        return $http.get(QST_URL + '?tagsId='+'PHP'+'&_expand=user');
    }
    this.getSpecificQuestion = () => {
        return $http.get('http://localhost:3000/questions/3?_expand=user&_embed=answers');
    }

}]);
