'use strict';

const QST_URL = "http://localhost:3000/questions";
const ASW_URL = "http://localhost:3000/answers";
const TIPS_URL = "http://localhost:3000/tips";


SERVICES.service('QuestionsService', ['$http', '$log', '$q', function ($http, $log, $q) {

    this.save = function (question) {
        var deferred = $q.defer();
        $http.post(QST_URL, question).then((response) => {
            deferred.resolve(response.data);
        }).catch((error) => {
            deferred.reject(error);
            $log.error(error);
        });

        return deferred.promise;
    };

    this.postAnswer = function (answer) {
        var defer = $q.defer();
        $http.post(ASW_URL, answer).then((response) => {
            defer.resolve(response.data);
        }).catch((error) => {
            defer.reject(error);
            $log.error(error);
        });

        return defer.promise;
    };

    this.getQuestions = () => {

        var defer = $q.defer();


        $http.get(QST_URL + '?_expand=user&_embed=answers').then((response) => {
            defer.resolve(response.data);
        }).catch((err) => {
            $log.debug(`SVC: ERROR!!! ${err}`);
            defer.reject(err);
        });

        return defer.promise;
    };

    this.getQuestionsTag = (tagid) => {
        var deferred = $q.defer();

        $http.get(QST_URL + '?tagsId=' + tagid + '&_expand=user').then((response) => {
            deferred.resolve(response.data);
        }).catch((error) => {
            deferred.reject(error);
            $log.error(error);
        });
        return deferred.promise;
    };

    this.getQuestionId = (id) => {
        var deferred = $q.defer();
<<<<<<< d8632f411f28f0642c264cf3b3ae8e8da25f3fda
        $http.get(QST_URL + '?id=' + id + '&_expand=user&_embed=answers').then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (error) {
                deferred.reject(error);
                $log.error(error);
            }
        );
=======
        $http.get(QST_URL + '?id=' + id + '&_expand=user').then((response) => {
            deferred.resolve(response.data);
        }).catch((error) => {
            deferred.reject(error);
            $log.error(error);
        })

>>>>>>> champion du monde
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

    this.viewQuestion = (question_id, paramView) => {
        var defer = $q.defer();

        $http.patch(QST_URL + '/' + question_id, paramView).then((response) => {
            defer.resolve(response.data);
        }).catch((err) => {
            $log.debug(`SVC: ERROR!!! ${err}`);
            defer.reject(err);
        });

        return defer.promise;
    };

    this.QuestionHome = () => {

        var defer = $q.defer();

        $http.get(QST_URL + '?_sort=id&_order=DESC&_end=2').then((response) => {
            defer.resolve(response.data);
        }).catch((err) => {
            $log.debug(`SVC: ERROR!!! ${err}`);
            defer.reject(err);
        });

        return defer.promise;
    };


    this.searchQuestions = (param) => {
        var defer = $q.defer();

        $http.get(QST_URL + '?q=' + param).then((response) => {
            defer.resolve(response.data);
        }).catch((error) => {
            $log.warn(`${error} : service couldn't reach server !`)
            defer.reject(error);
        });

        return defer.promise;
    }
}]);