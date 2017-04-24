'use strict';


COMPNT
  .component('userProfile', {
    templateUrl: '/frontend/app/components/user_profile_test_sacha/user_profile.html',

    bindings: {
      person: '<',
      question: '<'
    },

    controller: ['$cookies', 'UsersService', function ($cookies, UsersService) {

      this.getReponse = () => {
        UsersService.checkReponse(this.person.id).then((response) => { // j'envoye l'id et le token qui va avec
          this.reponse = response.data;
        }).catch((response) => {
          this.error = response.statusText || "une erreur s'est produite pendant l'identification"; //en cas d'échec je marque un message d'erreur
        });
      }

      this.getQuestion = () => {
        UsersService.checkQuestion(this.person.id).then((response) => { // j'envoye l'id et le token qui va avec
          this.question = response.data;
        }).catch((response) => {
          this.error = response.statusText || "une erreur s'est produite pendant l'identification"; //en cas d'échec je marque un message d'erreur
        });
      }

      this.openmodal = () => {
        $('#setting').modal('open');
      }


      this.$onInit = () => {
        this.getReponse();
        this.getQuestion();
        this.cookieUser = $cookies.get('id'); //je déclare mon cookie dans une variable pour pouvoir faire des conditions trql
        this.cookieToken = $cookies.get('tokenSecure'); //je déclare mon cookie dans une variable pour pouvoir faire des conditions trql
        function ajax() {
          $('.modal').modal();
        }
        ajax()
      };

    }]
  });