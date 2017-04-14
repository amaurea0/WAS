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

    this.updateContent = (id, content) => {
        var defer = $q.defer();

        $http.patch(QST_URL + '/' + id, content).then((response) => {
            defer.resolve(response.data);
        }).catch((error) => {
            $log.debug(`SVC: ERROR!!! ${err}`);
            defer.reject(error);
        });

        return defer.promise;
    };

    this.viewQuestion = (question_id, view) => {

        var defer = $q.defer();

        $http.patch(QST_URL + '/' + question_id, view).then((response) => {
            defer.resolve(response.data);
        }).catch((err) => {
            $log.debug(`SVC: ERROR!!! ${err}`);
            defer.reject(err);
        });

        return defer.promise;
    };

}]);