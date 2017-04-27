'use strict';

const TAGLNK_URL = "http://localhost:3000/taglinks";


SERVICES.service('TaglinkService', ['$http', '$log', '$q', function ($http, $log, $q) {

    // this.getQuestionsTag = () => {
    //     return $http.get(TAGLNK_URL + '?tagId='+'PHP'+'&_expand=user');
    // }

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

    this.getQuestionsTag = (tagid) => {
        var deferred = $q.defer();
        $http.get(TAGLNK_URL + '?tagId=' + tagid).then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (error) {
                deferred.reject(error);
                $log.error(error);
            }
        );
        return deferred.promise;
    }

    this.getQuestionTags = (questionid) => {
        var deferred = $q.defer();
        $http.get(TAGLNK_URL + '?questionId=' + questionid + '&_expand=tag').then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (error) {
                deferred.reject(error);
                $log.error(error);
            }
        );
        return deferred.promise;
    }
    this.displayTags = (question) => {
            this.getQuestionTags(question.id).then((arrayTags) => {
                $log.log(arrayTags[0]);
                question['tags'] = arrayTags;
            }).catch((err) => { });
    }
}]);

