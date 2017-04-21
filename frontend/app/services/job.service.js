'use strict';

const JOB_URL = "http://localhost:3000/jobs";


SERVICES.service('JobService', ['$http', '$log', '$q',

    function ($http, $log, $q) {

        this.getJobs = () => {
            var deferred = $q.defer();
            $http.get(JOB_URL).then(function (response) {
                deferred.resolve(response.data);
            }, function (error) {
                deferred.reject(error);
                $log.error(error);
            });
            return deferred.promise;
        };

        this.addJob = function (job) {
        var deferred = $q.defer();
        $http.post(JOB_URL, job).then((response) => {
                deferred.resolve(response.data);
            }).catch((error) => {
                deferred.reject(error);
                $log.error(error);
            });
        return deferred.promise;
    };

       /* this.addJob = function (job) {
            var deferred = $q.defer();
            (recipe.id ?
                $http.put(API_URL + '/' + recipe.id, recipe) :
            $http.post(JOB_URL, job)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                    $log.error(error);
                });
            return deferred.promise;
        }; */
    }
]
);
