'use strict';

/**
 * The recipeCreate component
 */
COMPNT.component("questionPost", {

  templateUrl: '/app/components/questions/question_post.html',

  bindings: {
    info: '<'
  },

  controller: ['QuestionsService', 'TagsService', 'TaglinkService', '$scope', '$state',

    function (QuestionsService, TagsService, TaglinkService, $scope, $state) {

      //get Tags for the input datalist
      TagsService.getTags().then((data) => {
        this.tags = data;
      }).catch((err) => { });

      this.new_tags = [];
      this.saveTag = (tag) => {
        this.new_tags.push(tag);
        this.SelectedTag = "";
      };

      this.save = (question) => {
        var new_question = {
          "title": question.title,
          "content": question.content,
          "nb_views": "",
          "votes": "",
          "date": new Date(),
          // "userId": this.info.userId
          "userId": 1
        }

        // Save the new question
        QuestionsService.save(new_question).then((items) => {
          console.log('new question posted');

          // Save the tags
          angular.forEach(this.new_tags, (value, key) => {
            var new_link = {};
            TagsService.getTagId(value).then((tag) => {
              new_link.questionId = items.id;
              new_link.tagId = tag[0].id;

              TaglinkService.saveTaglink(new_link).then((resp) => {
                console.log("new_link posted");

              }).catch((err) => { });
            }).catch((err) => { });
          });
          $state.go('questions');
        }).catch((err) => { });
      };
    }
  ]
});