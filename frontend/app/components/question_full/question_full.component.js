'use strict';

/**
 * The recipesList component
 */
COMPNT
    .component("questionFull", {

        templateUrl: '/app/components/question_full/question_full.html',

        bindings: {
            question: '<'
        },

        controller: function ($scope, $rootScope) {

            // var question = $resource("http://localhost:3000/questions" + "/" + this.question.id)

            // console.log($rootScope);
            // console.log($scope);
            // console.log(this.question);
        }
    });