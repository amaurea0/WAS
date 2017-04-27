'use strict';

SERVICES.service('UsersService', ['$http', '$log', '$q',

    function ($http, $log, $q) {

        const USER_URL = "http://localhost:3000/users";

        this.userId = (id) => {
            return $http.get(USER_URL + id);
        };

        this.addUser = function (user) {
            var deferred = $q.defer();

            $http.post(USER_URL, user)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                    $log.error(error);
                });
            return deferred.promise;
        };

        this.logUser = function (user) {

        };

        this.getUsers = () => {

            var defer = $q.defer();

            $http.get(USER_URL).then((response) => {
                defer.resolve(response.data);
            }).catch((err) => {
                $log.debug(`SVC: ERROR!!! ${err}`);
                defer.reject(err);
            });

            return defer.promise;
        };

        this.getPerson = (param) => {

            var defer = $q.defer();

            $http.get(USER_URL + '/' + param).then((response) => {
                defer.resolve(response.data);
            }).catch((err) => {
                $log.debug(`SVC: ERROR!!! ${err}`);
                defer.reject(err);
            });

            return defer.promise;
        }


        this.get = (mail) => {
            var deferred = $q.defer();
            $http.get(USER_URL + '?email=' + mail).then(function (response) {
                deferred.resolve(response.data);
                console.log("response")
                console.log(response.data[0].id)
                // $rootScope.$broadcast("userId", response.data[0].id);

            }, function (error) {
                deferred.reject(error);
                $log.error(error);
            });
            return deferred.promise;
        }

        this.getUserQuestions = (userId) => {
            var defer = $q.defer();

            $http.get('http://127.0.0.1:3000/users/' + userId + '?_embed=questions').then((response) => {
                defer.resolve(response.data);
            }).catch((error) => {
                defer.reject(error);
            });

            return defer.promise;
        }


        this.userConnect = (email, mdp) => {
            return $http.get('http://127.0.0.1:3000/users?email=' + email + '&pass=' + mdp + '');
        };
        this.userTokenAdd = (id, add) => {
            return $http.patch('http://127.0.0.1:3000/users/' + id + '', add);
        };
        this.patchSetting = (id, edit) => {
            return $http.patch('http://127.0.0.1:3000/users/' + id + '', edit);
        };
        this.verifToken = (id, token) => {
            return $http.get('http://127.0.0.1:3000/users?id=' + id + '&tokenSecure=' + token + '');
        };
        this.checkReponse = (id) => {
            return $http.get('http://127.0.0.1:3000/answers?userId=' + id + '&_sort=id&_order=DESC&_end=5');
        };
        this.checkQuestion = (id) => {
            return $http.get('http://127.0.0.1:3000/questions?userId=' + id + '&_sort=id&_order=DESC&_end=5');
        };



        // Fonction de Pierre qu'il doit terminer

        //     this.getUserJob = (user) => {
        //     var deferred = $q.defer();

        //     $http.get(USER_URL + '?jobId=' + tag).then(function (response) {
        //         deferred.resolve(response.data);
        //     }, function (error) {
        //         deferred.reject(error);
        //         $log.error(error);
        //     });
        //     return deferred.promise;
        // };

    }

]);