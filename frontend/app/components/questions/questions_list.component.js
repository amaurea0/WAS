'use strict';

/**
 * The recipesList component
 */
COMPNT
  .component("questionsList", {

    templateUrl: '/app/components/questions/questions_list.html',

    bindings: {
      list: '<',
      query: '@',
      tagFilter: '<',
      questions: '<'
    }
  });