'use strict';


COMPNT.component("answerPost", {

  templateUrl: '/frontend/app/components/answer/answer_post.html',

  bindings: {},

  controller: ['QuestionsService', 'AuthService', '$scope', '$state', 'notify', function (QuestionsService, AuthService, $scope, $state, notify) {

    var currentId = $scope.$parent.$ctrl.question.id;
    var answers = $scope.$parent.$resolve.question.answers;
    console.log($scope.$parent);

    this.saveAnswer = () => {
      var new_answer = {
        "title": this.answer.title,
        "content": this.answer.content,
        "nb_views": 0,
        "votes": 0,
        "date": new Date(),
        "userId": AuthService.getCurrentUser().id,
        "questionId": currentId
      }

      var newAnswersCount = {
        "answersCount": $scope.$parent.$ctrl.question.answersCount
      }

      QuestionsService.postAnswer(new_answer).then((response) => {
        console.log('POST :' + response + 'is posted');
        $state.go('questionSpec', {
          idQuestion: currentId
        });
        notify({
          message: 'Votre réponse a été posté !',
          duration: 2500,
          classes: 'green darken-1'
        })
      }).catch((err) => {
        notify({
          message: "Votre réponse n'a pas été posté !",
          duration: 2500,
          classes: 'red darken-1'
        })
      });

      QuestionsService.updateContent(currentId, newAnswersCount).then((response) => {
        console.log("did it work ?");
      }).catch((error) => {})

      answers.push(new_answer);

    }
  }]
})