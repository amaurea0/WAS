'use strict';

// const API_URL = "http://localhost:3000";

SERVICES.service('UsersListService', ['$http', function ($http) {

    this.getUsers = () => {
        return $http.get(API_URL + '/users');
    }
}]);