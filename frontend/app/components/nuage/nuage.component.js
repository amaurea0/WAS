'use strict';

COMPNT.component('nuage', {

  templateUrl: '/frontend/app/components/nuage/nuage.html',

  bindings: {
    list: '<',
    query: '@'
  },

  controller: ['TagsService', function (TagsService) {

    this.$onInit = () => {
      // this.words = [
      //   { text: 'Angular', size: 25, color: '#0e6632' },
      //   { text: 'Angular2', size: 35, color: '#0e558' }
      // ],
        this.nuage = {
          list: [],
          query: ''
        };
      this.getAllItems();
      this.initDrop = function() {
    $('.modal-trigger').leanModal(); // Initialize the modals
}

    };

    this.getAllItems = () => {
      TagsService.getTags().then((items) => {
        this.nuage.list = items;
      }).catch((err) => { });
    };

    // this.height = $window.innerHeight * 0.5;
    // this.width = $element.find('word-cloud')[0].offsetWidth;

    // this.wordClicked = (word) => {
    //   alert(word);
    // };

}]
});