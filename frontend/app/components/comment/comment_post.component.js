'use strict';


COMPNT.component("commentAnswer", {

  templateUrl: '/frontend/app/components/comment_post/comment_post.html',

  bindings: {
    question: '<',
    answer: '<'
  },

  controller: ['QuestionsService', 'AuthService', '$scope', '$state', function (QuestionsService, AuthService, $scope, $state) {

    var currentId = $scope.$parent.$ctrl.answer.id;

    this.saveComment = () => {
      var new_comment = { // poster un nouveau commentaire
        "content": this.comment.content,
        "date": new Date(),
        "userId": AuthService.getCurrentUser().id,
        "answerId": currentId
      }

      QuestionsService.postComment(new_comment).then((response) => {
        console.log('POSTCOMMENT :' + response + 'is posted');
        $state.go('questionSpec', {
          idQuestion: currentId
        });
      }).catch((err) => {
        alert("ERROR :" + err);
      });


    }
  }]
})