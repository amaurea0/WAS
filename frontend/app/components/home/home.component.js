'use strict';

WEA.component('home', {

  templateUrl: '/frontend/app/components/home/home.html',

  bindings: {

  },

  controller: ['UsersService', 'QuestionsService', 'JobService', 'authService', function (UsersService, QuestionsService, JobService, authService) {

    this.user = authService.getCurrentUser().id;

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
      self.getJob();

    };

    this.getQuestion = () => {
      QuestionsService.QuestionHome().then((response) => { // j'envoye l'id et le token qui va avec
        self.questions = response;
        this.VotedQuestion(self.questions);
      }).catch((response) => {
        self.error = response.statusText || "une erreur s'est produite pendant l'identification"; //en cas d'échec je marque un message d'erreur
      });
    };

    this.getJob = () => {
      JobService.JobHome().then((response) => { // j'envoye l'id et le token qui va avec
        self.jobs = response;
      }).catch((response) => {
        self.error = response.statusText || "une erreur s'est produite pendant l'identification"; //en cas d'échec je marque un message d'erreur
      });
    };

    this.VotedQuestion = (questions) => {
      questions.forEach((question) => {
        if (authService.getCurrentUser()) {
          QuestionsService.getIfMyVotedQuestion(question.id, authService.getCurrentUser().id).then((rsp) => {
            if (rsp.length > 0) {
              question.myQuestionVote = true;
            } else {
              question.myQuestionVote = false;
            }
          }).catch((error) => {});
        };
      })
    };

  }]

});