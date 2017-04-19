'use strict';

const QST_URL = "http://localhost:3000/questions";
const ASW_URL = "http://localhost:3000/answers";


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

    this.postAnswer = function (answer) {
        var defer = $q.defer();
        $http.post(ASW_URL, answer).then(
            function (response) {
                defer.resolve(response.data);
            },
            function (error) {
                defer.reject(error);
                $log.error(error);
            }
        );
        return defer.promise;
    };

    this.getQuestions = () => {

        var defer = $q.defer();


        $http.get(QST_URL + '?_expand=user').then((response) => {
            defer.resolve(response.data);
        }).catch((err) => {
            $log.debug(`SVC: ERROR!!! ${err}`);
            defer.reject(err);
        });

        return defer.promise;
    };

    this.getQuestionsTag = (tagid) => {
        var deferred = $q.defer();
        $http.get(QST_URL + '?tagsId=' + tagid + '&_expand=user').then(
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

    this.getQuestionId = (id) => {
        var deferred = $q.defer();
        $http.get(QST_URL + '?id=' + id + '&_expand=user').then(
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

    this.getSpecificQuestion = (param) => {

        var defer = $q.defer();

        $http.get(QST_URL + '/' + param + '?_expand=user&_embed=answers').then((response) => {
            defer.resolve(response.data);
        }).catch((err) => {
            $log.debug(`SVC: ERROR!!! ${err}`);
            defer.reject(err);
        });

        return defer.promise;
    };

    this.QuestionAll = () => {
        return $http.get('http://127.0.0.1:3000/questions?_sort=id&_order=DESC&_end=2');
    };

}]);