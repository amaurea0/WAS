'use strict';

WEA.service('AuthService', function ($rootScope, $q, $http, $window) {

    const API_URL = 'http://localhost:3000/users';
    const KEY = 'app-auth';

    this.isAuthenticated = () => {
        var user = angular.fromJson($window.localStorage.getItem(KEY));
        return user && typeof user.id != 'undefined';
    };

    this.getCurrentUser = () => {
        return angular.fromJson($window.localStorage.getItem(KEY));
    };

    this.getUserByEmail = (email) => {
        var defer = $q.defer();

        $http.get(API_URL + `?email=${email}`).then((response) => {
            if (response.data.length > 0) {
                defer.resolve(response.data);
            } else {
                defer.reject();
            }
        }).catch(() => {
            defer.reject();
        });

        return defer.promise;
    };

    this.getUserByPseudo = (pseudo) => {
        var defer = $q.defer();

        $http.get(API_URL + `?pseudo=${pseudo}`).then((response) => {
            if (response.data.length > 0) {
                defer.resolve(response.data);
            } else {
                defer.reject();
            }
        }).catch(() => {
            defer.reject();
        });

        return defer.promise;
    };

    this.createUser = (user) => {

        var defer = $q.defer();

        this.getUserByEmail(user.email).then(() => {
            defer.reject('Email déjà enregistré');
        }).catch(() => {
            this.getUserByPseudo(user.pseudo).then(() => {
                defer.reject('Pseudo déjà utilisé');
            }).catch(() => {
                $http.post(API_URL, user).then((response) => {
                    $window.localStorage.setItem(KEY, angular.toJson(response.data));
                    $rootScope.$emit('AUTH', true);
                    defer.resolve();
                });
            });
        });

        return defer.promise;
    };

    this.connect = (email, pwd) => {

        var defer = $q.defer();

        $http.get(API_URL + `?email=${email}&pass=${pwd}`).then((response) => {
            if (response.data.length > 0) {
                $window.localStorage.setItem(KEY, angular.toJson(response.data[0]));
                $rootScope.$emit('AUTH', true);
                defer.resolve();
            } else {
                defer.reject();
            }
        }).catch((response) => {
            console.log(response)
            defer.reject();
        });

        return defer.promise;
    };

    this.disconnect = () => {
        $window.localStorage.removeItem(KEY);
        $rootScope.$emit('AUTH', false);
    };

});