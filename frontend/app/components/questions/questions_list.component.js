'use strict';

/**
 * The recipesList component
 */
COMPNT
  .component("questionsList", {

    templateUrl: '/app/components/questions/questions_list.html',

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
          console.log('get Question Tag : ')
          console.log(items)
          this.model.tagQuestionId = items;

          angular.forEach(this.model.tagQuestionId, (value, key) => {
            QuestionsService.getQuestionId(value.questionId).then((question) => {
              console.log('get Question Id : ')
              console.log(question)
              console.log('list questions selected :')
              console.log(this.questions)
              console.log(this.model.tagQuestionId)

              this.questions.push(question[0]);
              console.log(this.questions)


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