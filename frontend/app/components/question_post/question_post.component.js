'use strict';

/**
 * The recipeCreate component
 */
COMPNT.component("questionPost", {

    templateUrl: '/app/components/question_post/question_post.html',

    bindings: {
    },

    controller: ['QuestionsService',

      function (QuestionsService) {

        // Save the new question
        this.save = (question) => {
          QuestionsService.save(question).then((items) => {
            // $state.go('list');
            console.log('yeeeah');
          }).catch((err) => {});
        };
      }
    ]
  });