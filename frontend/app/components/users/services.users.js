SERVICES.service('usersService', ['$http', '$log', '$q',

        function ($http, $log, $q) {

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


        }

    ]);
