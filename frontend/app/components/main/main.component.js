'use strict';

COMPNT
  .component("mainjs", {

    templateUrl: '/frontend/app/components/main/main.html',

    bindings: {},

    controller: ['$scope', 'INFO', '$state', 'notify',

      function ($scope, INFO, $state, notify) {

        this.info = '';
        this.searchQuery = '';
        this.newAnswers = 3;

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

          notify({
            message: 'Vous avez ' + this.newAnswers + ' nouvelles réponses',
            classes: 'teal accent-3',
            duration: 0
          });
        };

        this.getSearchQuestions = () => {
          var queryAsArray = this.searchQuery.split(' ');
          var queryAsString = queryAsArray.join('+');
          $state.go('questions', {
            queryParam: queryAsString
          });
        }

        notify.config({
          position: 'right',
          startTop: 68
        })
      }
    ]
  });