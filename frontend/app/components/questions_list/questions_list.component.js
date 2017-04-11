'use strict';

/**
 * The recipesList component
 */
COMPNT
  .component("questionsList", {

    templateUrl: '/app/components/questions_list/questions_list.html',

    bindings: {
      list: '<',
      query: '@',
      questions: '<'
    },
  });