'use strict';

/**
 * The recipeCreate component
 */
COMPNT.component("jobPost", {

  templateUrl: '/frontend/app/components/jobs/job_post.html',

  bindings: {
    info: '<'
  },


  controller: ['JobService', 'TagsService', '$scope', '$state',
    function (JobService, TagsService, $scope, $state) {

      this.job = {};

      //get Tags for the input datalist
      TagsService.getTags().then((data) => {
        this.tags = data;
      }).catch((err) => { });

      this.new_tags = [];
      this.saveTag = (tag) => {
        if (this.new_tags.indexOf(tag) == -1) this.new_tags.push(tag);
        this.SelectedTag = "";
      };
      this.removeTag = (tag) => {
        this.new_tags.splice(this.new_tags.indexOf(tag), 1);
      };

      this.saveJob = () => {
        var new_job = {
          "title": this.job.title,
          "content": this.job.content,
          "place": this.job.place,
          "society": this.job.society,
          "date": new Date(),
          "email": this.job.email,
          "site": this.job.site,
          "annonce": this.job.annonce,
          "tag": this.new_tags
        }

        console.log(new_job);

        // Save the new question
        JobService.addJob(new_job).then(() => {
          console.log('new job posted');

          // Save the tags
          angular.forEach(this.new_tags, (value, key) => {
            var new_tag = {};
            TagsService.getTagId(value).then((tags) => {
              new_tag.tagsId = tags[0].id;

              TagsService.saveTag(new_tag).then((resp) => {
                console.log("new_tag posted");

              }).catch((err) => { });
            }).catch((err) => { });
          });
          $state.go('jobs');
        }).catch((err) => { });
      };
    }
  ]
});