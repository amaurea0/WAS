'use strict';

/**
 * The recipesList component
 */
COMPNT
  .component("questionsFull", {

    templateUrl: '/app/components/questions_full/questions_full.html',

    bindings: {
      list: '<',
      query: '@',
      questions: '<'
    },

    controller: ['QuestionsService', function (QuestionsService) {

      this.model = {
        list: [],
        query: ''
      };

      this.$onInit = () => {
        this.getQuestionAnswers();
      };

      this.getQuestionAnswers = () => {
        QuestionsService.getQuestions().then((items) => {
          this.model.list = items.data;
          console.log(items.data);
        }).catch((err) => {});
      };

    }]
  });