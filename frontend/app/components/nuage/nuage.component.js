'use strict';

COMPNT.component('nuage', {

  templateUrl: '/frontend/app/components/nuage/nuage.html',

  bindings: {
    list: '<',
    query: '@'
  },

  controller: ['TagsService', function (TagsService) {

    this.$onInit = () => {
      this.nuage = {
        list: [],
        query: ''
      };
      this.getAllItems();
    };

    this.getAllItems = () => {
      TagsService.getTags().then((items) => {
        this.nuage.list = items;
      }).catch((err) => { });
    };

  }]
});