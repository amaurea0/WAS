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

        controller: ['AuthService', function (AuthService) {
            this.$onInit = () => {
                console.log(this.question);
                this.myQuestion = false;
                if (this.question.userId == AuthService.getCurrentUser().id) this.myQuestion = true;
                console.log(this.myQuestion);
            };
        }]
    });