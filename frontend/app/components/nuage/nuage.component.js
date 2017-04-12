'use strict';

COMPNT.component('nuage', {

  templateUrl: '/app/components/nuage/nuage.html',

  bindings: {
    tags: '<'
  },

  controller: ['TagsService', function (TagsService) {

    this.$onInit = () => {
      this.tags = [];

      this.getAllItems();
    };

    this.getAllItems = () => {
      TagsService.getTags().then((items) => {
        this.tags = items;
        console.log(items);

      }).catch((err) => { });
    };

  }]
});