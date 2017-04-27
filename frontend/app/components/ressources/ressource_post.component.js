'use strict';

/**
 * The recipeCreate component
 */
COMPNT.component("ressourcePost", {

  templateUrl: '/frontend/app/components/ressources/ressource_post.html',

  bindings: {
    tagFilter: '<',
    info: '<'
  },

  controller: ['ressourcesService', 'TagsService', 'TaglinkService', 'authService', '$scope', '$state', 'notify',

    function (ressourcesService, TagsService, TaglinkService, authService, $scope, $state, notify) {

      this.$onInit = () => {
        console.log(this.tagFilter);

        //get Tags for the input datalist
        TagsService.getTags().then((data) => {
          this.tags = data;
          this.tagsname = [];
          this.tags.forEach((tag) => {
            this.tagsname.push(tag.name);
          })
        }).catch((err) => { });
        this.new_tags = [];
      };

      this.saveTag = (tag) => {
        if (this.tagsname.indexOf(tag) !== -1) {
          this.new_tags[0] = tag;
          this.new_tag_name = tag;
          this.SelectedTag = "";
        }
      };

      this.removeTag = (tag) => {
        this.new_tags.splice(this.new_tags.indexOf(tag), 1);
      };

      this.save = () => {
        
        this.tags.some((tag) => {
          if (tag.name == this.new_tag_name) {
            this.new_tag_id = tag.id;
            return true;
          }
        })

        var new_ressource = {
          "title": this.ressource.title,
          "url": this.ressource.url,
          "content": this.ressource.content,
          "tagId": this.new_tag_id,
          "userId": authService.getCurrentUser().id
        }

        // Save the new ressource
        ressourcesService.save(new_ressource).then((items) => {
          console.log('new resource posted');
          $state.go('ressources', { tagName: this.new_tag_name, tagId: this.new_tag_id });

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