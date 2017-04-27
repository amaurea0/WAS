'use strict';


COMPNT
  .component('userProfile', {
    templateUrl: '/frontend/app/components/user_profile_test_sacha/user_profile.html',

    bindings: {
      person: '<',
      question: '<'
    },

    controller: ['$cookies', 'UsersService', '$state', '$stateParams', '$timeout', function ($cookies, UsersService, $state, $stateParams, $timeout) {

      this.getReponse = () => {
        UsersService.checkReponse(this.person.id).then((response) => { // j'envoye l'id et le token qui va avec
          this.reponse = response.data;
        }).catch((response) => {
          this.error = response.statusText || "une erreur s'est produite pendant l'identification"; //en cas d'échec je marque un message d'erreur
        });
      }

      this.pathSetting = (settings) => {
        this.addSettings = {
          pseudo: this.setting.pseudo,
          last_name: this.setting.nom,
          first_name: this.setting.prenom,
          facebook: this.setting.facebook,
          twitter: this.setting.twitter,
          github: this.setting.github,
          ville: this.setting.ville,
          profile: this.setting.profil,
          graduation: this.setting.graduation
        }
        this.person = this.addSettings;

        UsersService.patchSetting(this.cookieUser, this.addSettings).then((response) => { // j'envoye l'id et le token qui va avec
        }).catch((response) => {
          this.error = response.statusText || "une erreur s'est produite pendant l'identification"; //en cas d'échec je marque un message d'erreur
        });

        $('#setting').modal('close');


        $timeout(function () {
          $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
          });
        }, 0);
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
        this.uncheckedAnswers = [];

        function ajax() {
          $('.modal').modal();
        }

        UsersService.getPerson(this.cookieUser);
        ajax()

        this.getNewAnswers(this.cookieUser);

      };

      this.getNewAnswers = (userId) => {
        UsersService.getUserQuestions(userId).then((items) => {
          for (let i = 0; i < items.questions.length; i++) {
            if (items.questions[i].answersCount != 0) {
              this.uncheckedAnswers.push(items.questions[i])
            }
          }
          console.log(this.uncheckedAnswers);
        }).catch((error) => {})
      }


    }]
  });