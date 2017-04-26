'use strict';

/**
 * The recipeCreate component
 */
COMPNT.component("ressourcePost", {

  templateUrl: '/frontend/app/components/ressources/ressource_post.html',

  bindings: {
    info: '<'
  },

  controller: ['ressourcesService', 'TagsService', 'TaglinkService', 'authService', '$scope', '$state', 'notify',

    function (ressourcesService, TagsService, TaglinkService, authService, $scope, $state, notify) {

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
        $state.go('ressources');
      }

      this.save = (ressource) => {

        var new_ressource = {
          "title": this.ressource.title,
          "url": this.ressource.url,
          "userId": authService.getCurrentUser().id
        }

        // Save the new ressource
        ressourcesService.save(new_ressource).then((items) => {
          console.log('new question posted');

          // Save the tags
          angular.forEach(this.new_tags, (value, key) => {
            var new_link = {};
            ressourcesService.getTagId(value).then((tag) => {
              new_ressource.tagId = tag[0].id;

              ressourcesService.saveTaglink(new_link).then((resp) => {
                console.log("new_link posted");

              }).catch((err) => {});
            }).catch((err) => {});
          });
          $state.go('ressources');
          notify({
            message: 'Thks for your post !',
            duration: 2500,
            classes: 'green darken-1'
          })
        }).catch((err) => {
          notify({
            message: "There's been a problem while posting your resource. Please try again later.",
            duration: 2500,
            classes: ' red darken-1'
          })
        });
      };
    }
  ]
});