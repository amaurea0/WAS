'use strict';

COMPNT
  .component("main", {

    templateUrl: '/frontend/app/components/main/main.html',

    bindings: {},

    controller: ['$scope', 'INFO', '$state',

      function ($scope, INFO, $state) {

        this.info = '';

        this.searchQuery = '';

        $scope.$on(INFO.userId, (event, key) => {
          this.info.userId = key;
          console.log("éh la" + key)
        });


        this.$onInit = () => {
          this.rebindDropDowns = function () {
            $('.dropdown-button').dropdown({
              hover: true
            });
            $('.dropdown-button').dropdown('close');
            $('.button-collapse').sideNav();
            $('.collapsible').collapsible();
          };
        };

        this.getSearchQuestions = () => {
          var queryAsArray = this.searchQuery.split(' ');
          var queryAsString = queryAsArray.join('+');
          $state.go('questions', {
            queryParam: queryAsString
          });
        }
      }
    ]
  });