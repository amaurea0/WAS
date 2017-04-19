'use strict';

COMPNT
  .component("main", {

    templateUrl: '/frontend/app/components/main/main.html',

    bindings: {
    },

    controller: ['$scope', 'INFO',

      function ($scope, INFO) {
          console.log("Hello l'utlisateur :" + INFO.userId)
      }]
  });

