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


      //get Tags for the input datalist
      TagsService.getTags().then((data) => {
        this.tags = data;
      }).catch((err) => { });

      this.new_tags = [];
      this.saveTag = (tag) => {
        if(this.new_tags.indexOf(tag) == -1) this.new_tags.push(tag);
        this.SelectedTag = "";
      };
      this.removeTag = (tag) => {
        this.new_tags.splice(this.new_tags.indexOf(tag),1);
      };

      this.save = (job) => {
        var new_job = {
          "title": job.title,
          "content": job.content,
          "place": job.place,
          "society": job.society,
          "date": new Date(),
          "email": job.email,
          "site": job.site,
          "annonce": job.annonce,
          "tag": job.tag
        }

        console.log(new_job);

        // Save the new question
        JobService.addJob(new_job).then((items) => {
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