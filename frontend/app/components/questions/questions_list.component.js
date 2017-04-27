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

    controller: ['TaglinkService', '$state', '$stateParams', 'QuestionsService', '$log', 'authService', function (TaglinkService, $state, $stateParams, QuestionsService, $log, authService) {

      this.tabsList = [{
        "view": "view1",
        "label": "Most Popular",
        "sort": "-votes"
      },
      {
        "view": "view2",
        "label": "Most Viewed",
        "sort": "-nb_views"
      },
      {
        "view": "view3",
        "label": "Latest",
        "sort": "-date"
      },
      {
        "view": "view4",
        "label": "Least Answered",
        "sort": "answers"
      }
      ];

      this.model = {
        tagQuestionId: [],
        query: ''
      };
      this.currentPage = 1;
      this.pageSize = 4;
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

      this.pageChangeHandler = (num) => {
        console.log('going to page ' + num);
      };

      this.getTagedItems = () => {
        TaglinkService.getQuestionsTag(this.tagFilter.tagId).then((items) => {
          this.model.tagQuestionId = items;

          angular.forEach(this.model.tagQuestionId, (value, key) => {
            QuestionsService.getQuestionId(value.questionId).then((question) => {
              this.questions.push(question[0]);
            }).catch((err) => { });
          });

          this.VotedQuestion(this.questions);
        }).catch((err) => { });
      };

      this.getAllItems = () => {
        QuestionsService.getQuestions().then((items) => {

          this.questions = items;
          this.questions.forEach((currentQuestion) => {
            TaglinkService.getQuestionTags(currentQuestion.id).then((arrayTags) => {
              $log.log(arrayTags[0]);
              currentQuestion['tags'] = arrayTags;
              
            }).catch((err) => { });


          })


        this.VotedQuestion(this.questions);
      }).catch((err) => { });
      };

this.removeTag = () => {
  $state.go('questions');
};

this.getQueries = (param) => {
  QuestionsService.searchQuestions(param).then((items) => {
    this.questions = items;
    this.VotedQuestion(this.questions);
  }).catch((error) => { })
}

this.countViews = (id) => {
  var updatedCount = {}
  QuestionsService.getQuestionId(id).then((response) => {
    updatedCount.nb_views = response[0].nb_views + 1

    QuestionsService.updateContent(id, updatedCount).then((response) => {
      $log.log('views updated');
    }).catch((error) => { });

  }).catch((error) => {
    $log.error('pb sur getQuestionId');
  });

}

this.VotedQuestion = (questions) => {
  questions.forEach((question) => {
    if (authService.getCurrentUser()) {
      QuestionsService.getIfMyVotedQuestion(question.id, authService.getCurrentUser().id).then((rsp) => {
        if (rsp.length > 0) {
          question.myQuestionVote = true;
        } else {
          question.myQuestionVote = false;
        }
      }).catch((error) => { });
    };
  })
}

    }]
  });