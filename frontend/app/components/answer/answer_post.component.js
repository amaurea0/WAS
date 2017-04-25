'use strict';


COMPNT.component("answerPost", {

  templateUrl: '/frontend/app/components/answer/answer_post.html',

  bindings: {},

  controller: ['QuestionsService', 'authService', '$scope', '$state', function (QuestionsService, authService, $scope, $state) {

    var currentId = $scope.$parent.$ctrl.question.id;

    this.saveAnswer = () => {
      var new_answer = {
        "title": this.answer.title,
        "content": this.answer.content,
        "nb_views": 0,
        "votes": 0,
        "date": new Date(),
        "userId": authService.getCurrentUser().id,
        "questionId": currentId
      }

      QuestionsService.postAnswer(new_answer).then((response) => {
        console.log('POST :' + response + 'is posted');
        $state.go('questionSpec', {
          idQuestion: currentId
        });
      }).catch((err) => {
        alert("ERROR :" + err);
      });


    }
  }]
})