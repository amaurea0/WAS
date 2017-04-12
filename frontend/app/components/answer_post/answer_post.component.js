'use strict';


COMPNT.component("answerPost", {

  templateUrl: '/app/components/answer_post/answer_post.html',

  bindings: {},

  controller: ['QuestionsService', '$scope',

    function (QuestionsService, $scope, $rootScope) {


      // console.log($rootScope);
      // console.log($scope.$parent);
      // Save the new answer
      this.saveAnswer = () => {
        var new_answer = {
          "title": this.answer.title,
          "content": this.answer.content,
          "nb_views": "",
          "votes": "",
          "date": new Date(),
          // "userId": this.details.user.id,
          "questionId": $scope.$parent.$ctrl.question.id
        }

        console.log(this);

        QuestionsService.postAnswer(new_answer).then((items) => {
          // $state.go('list');
          console.log('yeeeah');
        }).catch((err) => {});
      };
    }
  ]
});