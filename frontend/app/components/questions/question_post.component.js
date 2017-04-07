'use strict';

/**
 * The recipeCreate component
 */
COMPNT.component("questionPost", {

  templateUrl: '/app/components/questions/question_post.html',

  bindings: {
    info: '<'
  },

  controller: ['QuestionsService', 'TagsService', '$scope',

    function (QuestionsService, TagsService, $scope) {

      TagsService.getTags().then((data) => {
        this.tags = data;
        console.log(data);
      }).catch((err) => { });

      // Save the new question
      this.save = (question) => {
        var new_question = {
          "title": question.title,
          "content": question.content,
          "nb_views": "",
          "votes": "",
          "date": new Date(),
          "userId": this.info.userId
        }

        QuestionsService.save(new_question).then((items) => {
          // $state.go('list');
          console.log('yeeeah');
        }).catch((err) => { });
      };
    }
  ]
});