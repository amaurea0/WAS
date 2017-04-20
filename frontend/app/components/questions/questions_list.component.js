'use strict';

/**
 * The recipesList component
 */
COMPNT
  .component("questionsList", {

    templateUrl: '/frontend/app/components/questions/questions_list.html',

    bindings: {
      list: '<',
      query: '@',
      tagFilter: '<'
    },

    controller: ['QuestionsService', 'TaglinkService', '$state',function (QuestionsService, TaglinkService, $state) {

      this.tabsList = [
        {
          "view": "view1",
          "label": "Plus populaire",
          "sort": "-votes"
        },
        {
          "view": "view2",
          "label": "Plus vues",
          "sort": "-nb_views"
        },
        {
          "view": "view3",
          "label": "Latest",
          "sort": "-date"
        },
        {
          "view": "view4",
          "label": "Less answers",
          "sort": "answers"
        }
      ];

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
        QuestionsService.getQuestions().then((items) => {
          this.questions = items;
          console.log(items);
        }).catch((err) => { });
      };

      this.removeTag = () => {
        $state.go('questions');
      };

    }]
  });
