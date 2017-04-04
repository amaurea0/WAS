'use strict';

/**
 * The recipesList component
 */
COMPNT
  .component("questionsList", {

    templateUrl: '/app/components/questions_list/questions_list.html',

    bindings: {
      list: '<',
      query: '@'
    },

    controller: ['QuestionsListService', function (QuestionsListService) {

      this.model = {
        list: [],
        query: ''
      };

      this.$onInit = () => {
        this.getAllItems();
      };

      this.getAllItems = () => {
        QuestionsListService.get().then((items) => {
          this.model.list = items.data;
          console.log(items.data);
        }).catch((err) => {});
      };

    //   // Remove an existing item
    //   this.removeItem = (item) => {
    //     RecipesService.delete(item).then((items) => {
    //       this.model.list.splice(this.model.list.indexOf(item), 1);
    //     }).catch((err) => {});
    //   };

    //   // Toggle items completion flag
    //   this.markAll = (completed) => {
    //     this.model.list.forEach((item) => item.completed = !completed);
    //     this.model.allChecked = !completed;
    //   };

    //   // Remove all checked items
    //   this.clearCompletedItems = () => {
    //     this.model.list = this.model.list.filter((item) => !item.completed);
    //   };

    }]
  });