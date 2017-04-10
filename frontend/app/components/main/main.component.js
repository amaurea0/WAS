'use strict';

COMPNT
  .component("main", {

    templateUrl: '/app/components/main/main.html',

    bindings: {
    },

    controller: ['$scope', 'INFO',

      function ($scope, INFO) {

        this.info= {};

        $scope.$on(INFO.userId, (event, key) => {
          this.info.userId = key;
          console.log("éh la"+key)
        });


      }]
  });