'use strict';

/**
 * The recipesList component
 */
COMPNT
  .component("questionsList", {

    templateUrl: '/app/components/questions_list/questions_list.html',

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
        this.getAllItems();
      };

      this.getAllItems = () => {
        QuestionsService.getQuestions().then((items) => {
          this.model.list = items.data;
          console.log(items.data);
        }).catch((err) => {});
      };

    }]
  });