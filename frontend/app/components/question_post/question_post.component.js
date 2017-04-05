'use strict';

/**
 * The recipeCreate component
 */
COMPNT.component("questionPost", {

    templateUrl: '/app/components/question_post/question_post.html',

    bindings: {
    },

    controller: ['QuestionPostService',

      function (QuestionPostService) {

        // Save the new question
        this.save = (question) => {
          QuestionPostService.save(question).then((items) => {
            // $state.go('list');
            console.log('yeeeah');
          }).catch((err) => {});
        };
      }
    ]
  });