'use strict';

/**
 * The recipesList component
 */
COMPNT
    .component("questionFull", {

        templateUrl: '/app/components/questions/question_full.html',

        bindings: {
            list: '<',
            query: '@',
            questions: '<'
        },

        controller: ['QuestionsService', function (QuestionsService) {

            this.model = {
                list: [],
                query: '',
                question: {}
            };

            this.$onInit = () => {
                this.displaySpecificQuestion();
            };

            this.displaySpecificQuestion = () => {
                QuestionsService.getSpecificQuestion().then((item) => {
                    this.model.list = item.data.answers;
                    this.model.question = item.data;
                    console.log(this.model.question);
                    console.log(this.model.list)
                }).catch((err) => {});
            };

        }]
    });