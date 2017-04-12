'use strict';


COMPNT
  .component("tags", {

    templateUrl: '/app/components/questions/questions_list.html',
                  

    bindings: {
      tags: '<',
      currentTag: '<'
    },

    controller: ['QuestionsService', '$stateParams', function (QuestionsService, $stateParams) {
      
      this.model = {
        list: [],
      };
      

      this.$onInit = () => {
        console.log(this.currentTag.nameTag);
        this.getAllItems();
      };

      this.getAllItems = () => {
        QuestionsService.getQuestionsTag(this.currentTag.nameTag).then((questions) => {
            this.model.list = questions.data;
            console.log(questions.data);            
         
        }).catch((err) => { });
      };

    }]
  });