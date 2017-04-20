'use strict';

WEA.component('home', {

  templateUrl: '/frontend/app/components/home/home.html',

  bindings: {

  },

  controller: ['UsersService', 'QuestionsService', function (UsersService, QuestionsService) {


    var self = this;
    this.ajax = function () {
      $(function () {
        // wait till load event fires so all resources are available
        self.ajaxAcceuil =
          $('.button-collapse').sideNav();
        $('.parallax').parallax();
      });
    }


    this.$onInit = () => {
      self.ajax(); // initialization du jquery
      self.getQuestion();
    };


    this.getQuestion = () => {
      QuestionsService.QuestionHome().then((response) => { // j'envoye l'id et le token qui va avec
        self.questions = response;
      }).catch((response) => {
        self.error = response.statusText || "une erreur s'est produite pendant l'identification"; //en cas d'échec je marque un message d'erreur
      });
    }

  }]

});
