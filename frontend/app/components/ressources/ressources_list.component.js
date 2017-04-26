'use strict';

/**
 * The recipesList component
 */
COMPNT
  .component("ressourcesList", {

    templateUrl: '/frontend/app/components/ressources/ressources_list.html',

    bindings: {
      query: '@',
      tagFilter: '<',
      info: '<',
      search: '@'
    },

    controller: ['ressourcesService', '$state', '$stateParams', function (ressourcesService, $state, $stateParams) {


      this.model = {
        tagRessourcesId: [],
        query: ''
      };
      this.currentPage = 1;
      this.pageSize = 2;
      this.ressources = [];

      this.$onInit = () => {
        console.log(this.tagFilter)
       if (this.tagFilter) {
          this.getTagedItems();
        } else {
          this.getAllItems();
        }
      };

      this.pageChangeHandler = function (num) {
        console.log('going to page ' + num);
      };

      this.getTagedItems = () => {
        ressourcesService.getRessourceTag(this.tagFilter.tagId).then((items) => {
          this.ressources = items;
          console.log(items);
        }).catch((err) => {});
      };

      this.getAllItems = () => {
        ressourcesService.getRessource().then((items) => {
          this.ressources = items;
          console.log(items);
        }).catch((err) => {});
      };

      this.removeTag = () => {
        $state.go('ressources');
      };

      this.getQueries = (param) => {
        ressourcesService.searchQuestions(param).then((items) => {
          this.questions = items;
          console.log(this.questions);
        }).catch((error) => {})
      }

    }]
  });