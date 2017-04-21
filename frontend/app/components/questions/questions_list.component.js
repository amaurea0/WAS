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
      tagFilter: '<',
      info: '<',
      search: '@'
    },

    controller: ['TaglinkService', '$state', '$stateParams', 'QuestionsService', function (TaglinkService, $state, $stateParams, QuestionsService) {

      this.tabsList = [{
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
      this.currentPage = 1;
      this.pageSize = 2;
      this.questions = [];

      this.$onInit = () => {
        if (this.search) {
          this.getQueries(this.search);
        } else if (this.tagFilter) {
          this.getTagedItems();
        } else {
          this.getAllItems();
        }
      };

      this.pageChangeHandler = function (num) {
        console.log('going to page ' + num);
      };

      this.getTagedItems = () => {
        TaglinkService.getQuestionsTag(this.tagFilter.tagId).then((items) => {
          this.model.tagQuestionId = items;

          angular.forEach(this.model.tagQuestionId, (value, key) => {
            QuestionsService.getQuestionId(value.questionId).then((question) => {
              this.questions.push(question[0]);
            }).catch((err) => {});
          });

        }).catch((err) => {});
      };

      this.getAllItems = () => {
        QuestionsService.getQuestions().then((items) => {
          this.questions = items;
          console.log(items);
        }).catch((err) => {});
      };

      this.removeTag = () => {
        $state.go('questions');
      };

      this.getQueries = (param) => {
        QuestionsService.searchQuestions(param).then((items) => {
          this.questions = items;
          console.log(this.questions);
        }).catch((error) => {})
      }
    }]
  });