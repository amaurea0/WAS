'use strict';

const API_URL = "http://localhost:3000/questions";

/**
 * The recipes service
 */
SERVICES.service('QuestionsListService', ['$http', function ($http) {

    this.get = function () {
      return $http.get(API_URL);
    }

    this.getById = function (id) {
      return $http.get(API_URL + '/' + id);
    }

    this.save = function (recipe) {
      if (recipe._id) {
        return $http.put(API_URL + '/' + recipe._id, recipe);
      } else {
        return $http.post(API_URL, recipe);
      }
    }

    this.delete = function (recipe) {
      return $http.delete(API_URL + '/' + recipe._id);
    }

}]);