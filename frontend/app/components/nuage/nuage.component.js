'use strict';

COMPNT.component('nuage', {

  templateUrl: '/app/components/nuage/nuage.html',

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
      console.log(this.nuage)
      this.getAllItems();
    };

    this.getAllItems = () => {
      TagsService.getTags().then((items) => {
        console.log(items);
        console.log(this.nuage.list)
        this.nuage.list = items;
        console.log(this.nuage.list)
      }).catch((err) => { });
    };

  }]
});