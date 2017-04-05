'use strict';

const API_URL = "http://localhost:3000";

/**
 * The recipes service
 */
SERVICES.service('QuestionsListService', ['$http', function ($http) {

    this.getQuestions = () => {
      return $http.get(API_URL + '/questions?_expand=user');
    }

    // this.getById = function (id) {
    //   return $http.get(API_URL + '/questions/' + id);
    // }

    // this.getUser = function (userId) {
    //   return $http.get(API_URL + '/users/' + userId);
    // }

    // this.save = function (recipe) {
    //   if (recipe._id) {
    //     return $http.put(API_URL + '/' + recipe._id, recipe);
    //   } else {
    //     return $http.post(API_URL, recipe);
    //   }
    // }

    // this.delete = function (recipe) {
    //   return $http.delete(API_URL + '/' + recipe._id);
    // }

}]);