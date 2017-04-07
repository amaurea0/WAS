'use strict';


COMPNT
  .component("tags", {

    templateUrl: '/app/components/questions_list/questions_list.html',

    bindings: {
      tags: '<'
    },

    controller: ['QuestionsService', function (QuestionsService) {

      this.model = {
        list: [],
      };

      this.$onInit = () => {
        this.getAllItems();
      };

      this.getAllItems = () => {
        QuestionsService.getQuestionsTag().then((items) => {
          this.model.list = items.data;
         
        }).catch((err) => { });
      };

    }]
  });