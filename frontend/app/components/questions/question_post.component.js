'use strict';

/**
 * The recipeCreate component
 */
COMPNT.component("questionPost", {

  templateUrl: '/frontend/app/components/questions/question_post.html',

  bindings: {
    info: '<'
  },

  controller: ['QuestionsService', 'TagsService', 'TaglinkService', 'authService', '$scope', '$state', 'notify',

    function (QuestionsService, TagsService, TaglinkService, authService, $scope, $state, notify) {

      //get Tags for the input datalist
      TagsService.getTags().then((data) => {
        this.tags = data;
        this.tagsname = [];
        this.tags.forEach((tag) => {
          this.tagsname.push(tag.name);
        })
      }).catch((err) => {});

      this.new_tags = [];
      this.saveTag = (tag) => {
        if (this.tagsname.indexOf(tag) !== -1) {
          if (this.new_tags.indexOf(tag) == -1) this.new_tags.push(tag);
          this.SelectedTag = "";
        }
      };
      this.removeTag = (tag) => {
        this.new_tags.splice(this.new_tags.indexOf(tag), 1);
      };
      this.cancel = () => {
        $state.go('questions');
      }

      this.save = (question) => {

        var new_question = {
          "title": this.question.title,
          "content": this.question.content,
          "nb_views": 0,
          "votes": 0,
          "date": new Date(),
          "answersCount": 0,
          "userId": authService.getCurrentUser().id
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

              }).catch((err) => {});
            }).catch((err) => {});
          });
          $state.go('questions');
          notify({
            message: 'Votre question a été posté !',
            duration: 2500,
            classes: 'green darken-1'
          })
        }).catch((err) => {
          notify({
            message: "Votre question n'a pas été posté !",
            duration: 2500,
            classes: ' red darken-1'
          })
        });
      };
    }
  ]
});