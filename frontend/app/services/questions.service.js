'use strict';

const QST_URL = "http://localhost:3000/questions";
const ASW_URL = "http://localhost:3000/answers";
const TIPS_URL = "http://localhost:3000/tips";
const VOTE_QST_URL = "http://localhost:3000/votes_question";
const VOTE_ASW_URL = "http://localhost:3000/votes_answer";


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

        $http.get(QST_URL + '?id=' + id + '&_expand=user&_embed=answers').then((response) => {
            deferred.resolve(response.data);
        }).catch((error) => {
            deferred.reject(error);
            $log.error(error);
        })

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

    this.updateVoteQuestion = (question_id, paramVote) => {
        var defer = $q.defer();

        $http.patch(QST_URL + '/' + question_id, paramVote).then((response) => {
            defer.resolve(response.data);
        }).catch((err) => {
            $log.debug(`SVC: ERROR!!! ${err}`);
            defer.reject(err);
        });

        return defer.promise;
    };

    this.updateVoteAnswer = (answer_id, paramVote) => {
        var defer = $q.defer();

        $http.patch(ASW_URL + '/' + answer_id, paramVote).then((response) => {
            defer.resolve(response.data);
        }).catch((err) => {
            $log.debug(`SVC: ERROR!!! ${err}`);
            defer.reject(err);
        });

        return defer.promise;
    };

    this.postVoteQuestionUser = function (vote) {
        var defer = $q.defer();
        $http.post(VOTE_QST_URL, vote).then((response) => {
            defer.resolve(response.data);
        }).catch((error) => {
            defer.reject(error);
            $log.error(error);
        });

        return defer.promise;
    };

    this.postVoteAnswerUser = function (vote) {
        var defer = $q.defer();
        $http.post(VOTE_ASW_URL, vote).then((response) => {
            defer.resolve(response.data);
        }).catch((error) => {
            defer.reject(error);
            $log.error(error);
        });

        return defer.promise;
    };

    this.voteQstExist = (questionid, userid) => {
        var defer = $q.defer();

        $http.get(VOTE_QST_URL + '?userId=' + userid + '&questionId=' + questionid).then((response) => {
            defer.resolve(response.data);
        }).catch((error) => {
            $log.warn(`${error} : service couldn't reach server !`)
            defer.reject(error);
        });

        return defer.promise;

    }

    this.voteAswExist = (answerid, userid) => {
        var defer = $q.defer();

        $http.get(VOTE_ASW_URL + '?userId=' + userid + '&answerId=' + answerid).then((response) => {
            defer.resolve(response.data);
        }).catch((error) => {
            $log.warn(`${error} : service couldn't reach server !`)
            defer.reject(error);
        });

        return defer.promise;

    }

    this.QuestionHome = () => {

        var defer = $q.defer();

        $http.get(QST_URL + '?_expand=user&_embed=answers&_sort=id&_order=DESC&_end=4').then((response) => {
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