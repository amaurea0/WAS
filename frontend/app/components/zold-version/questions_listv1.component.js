'use strict';

/**
 * The recipesList component
 */
COMPNT
  .component("questionsListv1", {

    templateUrl: '/frontend/app/components/questions/questions_listv1.html',

    bindings: {
      list: '<',
      query: '@',
      tagFilter: '<'
    },

    controller: ['QuestionsService', 'TaglinkService', function (QuestionsService, TaglinkService) {

      this.model = {
        tagQuestionId: [],
        query: ''
      };
      this.questions = [];

      this.$onInit = () => {
        if (this.tagFilter) this.getTagedItems();
        else this.getAllItems();

      };

      this.getTagedItems = () => {
        TaglinkService.getQuestionsTag(this.tagFilter.tagId).then((items) => {
          this.model.tagQuestionId = items;

          angular.forEach(this.model.tagQuestionId, (value, key) => {
            QuestionsService.getQuestionId(value.questionId).then((question) => {

              this.questions.push(question[0]);

            }).catch((err) => { });
          });

        }).catch((err) => { });
      };

      this.getAllItems = () => {
        QuestionsService.getQuestions('nb_views').then((items) => {
          this.questions = items;
          console.log(items);
        }).catch((err) => { });
      };

    }]
  });