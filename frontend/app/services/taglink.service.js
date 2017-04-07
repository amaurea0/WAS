'use strict';

const TAGLNK_URL = "http://localhost:3000/taglink";


SERVICES.service('TaglinkService', ['$http', '$log', '$q', function ($http, $log, $q) {

    this.getQuestionsTag = () => {
        return $http.get(TAGLNK_URL + '?tagId='+'PHP'+'&_expand=user');
    }
    this.getSpecificQuestion = () => {
        return $http.get('http://localhost:3000/questions/3?_expand=user&_embed=answers');
    }

}]);
