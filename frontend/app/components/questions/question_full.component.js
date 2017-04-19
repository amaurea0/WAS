'use strict';

/**
 * The recipesList component
 */
COMPNT
    .component("questionFull", {

        templateUrl: '/frontend/app/components/questions/question_full.html',

        bindings: {
            question: '<'
        },

        controller: function () {
            console.log(this.question);
        }
    });