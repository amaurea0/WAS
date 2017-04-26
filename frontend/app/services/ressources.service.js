'use strict';

const URL_RESS = "http://localhost:3000/ressources";
const TAG_URL = "http://localhost:3000/tags";

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








    
    this.getRessource = (id) => {
        var deferred = $q.defer();

        $http.get(URL_RESS + '?id=' + id + '&_expand=user&_embed=answers').then((response) => {
            deferred.resolve(response.data);
        }).catch((error) => {
            deferred.reject(error);
            $log.error(error);
        })

        return deferred.promise;
    };
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    this.save = function (ress) {
        var deferred = $q.defer();
        $http.post(URL_RESS, ress).then((response) => {
            deferred.resolve(response.data);
        }).catch((error) => {
            deferred.reject(error);
            $log.error(error);
        });

        return deferred.promise;
    };

    this.postRessource = function (ressource) {
        var defer = $q.defer();
        $http.post(URL_RESS, ressource).then((response) => {
            defer.resolve(response.data);
        }).catch((error) => {
            defer.reject(error);
            $log.error(error);
        });

        return defer.promise;
    };

    this.getRessources = () => {

        var defer = $q.defer();


        $http.get(URL_RESS + '?_expand=user&_embed=answers').then((response) => {
            defer.resolve(response.data);
        }).catch((err) => {
            $log.debug(`SVC: ERROR!!! ${err}`);
            defer.reject(err);
        });

        return defer.promise;
    };

    this.getQuestionsTag = (tagid) => {
        var deferred = $q.defer();

        $http.get(URL_RESS + '?tagsId=' + tagid + '&_expand=user').then((response) => {
            deferred.resolve(response.data);
        }).catch((error) => {
            deferred.reject(error);
            $log.error(error);
        });
        return deferred.promise;
    };

    this.getQuestionId = (id) => {
        var deferred = $q.defer();

        $http.get(URL_RESS + '?id=' + id + '&_expand=user&_embed=answers').then((response) => {
            deferred.resolve(response.data);
        }).catch((error) => {
            deferred.reject(error);
            $log.error(error);
        })

        return deferred.promise;
    };

    this.getSpecificQuestion = (param) => {

        var defer = $q.defer();

        $http.get(URL_RESS + '/' + param + '?_expand=user&_embed=answers').then((response) => {
            defer.resolve(response.data);
        }).catch((err) => {
            $log.debug(`SVC: ERROR!!! ${err}`);
            defer.reject(err);
        });

        return defer.promise;
    };

    this.getSpecificAnswer = (param) => {

        var defer = $q.defer();

        $http.get(URL_RESS + '/' + param + '?_expand=user').then((response) => {
            defer.resolve(response.data);
        }).catch((err) => {
            $log.debug(`SVC: ERROR!!! ${err}`);
            defer.reject(err);
        });

        return defer.promise;
    };

    this.updateContent = (id, content) => {
        var defer = $q.defer();

        $http.patch(URL_RESS + '/' + id, content).then((response) => {
            defer.resolve(response.data);
        }).catch((error) => {
            $log.debug(`SVC: ERROR!!! ${err}`);
            defer.reject(error);
        });

        return defer.promise;
    };

    this.updateContentAnswer = (id, content) => {
        var defer = $q.defer();

        $http.patch(URL_RESS + '/' + id, content).then((response) => {
            defer.resolve(response.data);
        }).catch((error) => {
            $log.debug(`SVC: ERROR!!! ${err}`);
            defer.reject(error);
        });

        return defer.promise;
    };

    this.viewQuestion = (question_id, paramView) => {
        var defer = $q.defer();

        $http.patch(URL_RESS + '/' + question_id, paramView).then((response) => {
            defer.resolve(response.data);
        }).catch((err) => {
            $log.debug(`SVC: ERROR!!! ${err}`);
            defer.reject(err);
        });

        return defer.promise;
    };

    this.updateVoteQuestion = (question_id, paramVote) => {
        var defer = $q.defer();

        $http.patch(URL_RESS + '/' + question_id, paramVote).then((response) => {
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