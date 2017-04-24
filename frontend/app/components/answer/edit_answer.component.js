'use strict';

COMPNT
  .component("editPost", {

    templateUrl: '/frontend/app/components/answer/edit_answer.html',

    bindings: {
      currentAnswer: '<'
    },

    controller: ['QuestionsService', '$state', function (QuestionsService, $state) {

      this.editContent = (answer) => {

        var currentId = this.currentAnswer.id;

        var new_content = {
          "title": this.answer.title,
          "content": this.answer.content
        };

        QuestionsService.updateContentAnswer(currentId, new_content).then((response) => {
          console.log('ANSWER :' + response.id + 'is updated !');
          $state.go('questionSpec', {
            idQuestion: response.questionId
          });
        }).catch((err) => {
          alert("ERROR :" + err);
        })
      }
    }]
  });