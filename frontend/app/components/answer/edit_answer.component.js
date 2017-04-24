'use strict';

COMPNT
  .component("editAnswer", {

    templateUrl: '/frontend/app/components/answer/edit_answer.html',

    bindings: {
      currentAnswer: '<'
    },

    controller: ['QuestionsService', '$state', function (QuestionsService, $state) {


    }]
  });