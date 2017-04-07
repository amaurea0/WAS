'use strict';

COMPNT
  .component("main", {

    templateUrl: '/app/components/main/main.html',

    bindings: {
    },

    controller: ['$scope',

      function ($scope) {

        this.info= {};

        $scope.$on("userId", (event, key) => {
          this.info.userId = key;
        });


      }]
  });