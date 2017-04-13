'use strict';

COMPNT
  .component("questionsComplet", {

    templateUrl: '/frontend/app/components/questions/questions_complet.html',

    bindings: {
      tagFilter: '<'
    },

    controller: ['$state',

      function ($state) {

        this.removeTag = () => {
          $state.go('questionscomplet');
        };
      }]

  });