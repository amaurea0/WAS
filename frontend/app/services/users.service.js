'use strict';

SERVICES.service('UsersService', ['$http', '$log', '$q',

    function ( $http, $log, $q) {

        const USER_URL = "http://localhost:3000/users";


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

        this.getUsers = () => {
            return $http.get(USER_URL);
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

    }

]);
