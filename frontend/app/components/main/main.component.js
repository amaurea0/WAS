'use strict';

COMPNT
  .component("mainjs", {

    templateUrl: '/frontend/app/components/main/main.html',

    bindings: {},

    controller: ['$state', 'UsersService', '$cookies', 'QuestionsService', '$scope', 'INFO', '$timeout', '$rootScope', function ($state, UsersService, $cookies, QuestionsService, $scope, INFO, $timeout, $rootScope) {

      this.info = {};

      var self = this;

      this.submitCreation = (user) => {
        console.log(user)
        this.errorMessage2 = '';
        if (user.email.toLowerCase().indexOf(('@gmail.com').toLowerCase()) == -1) {
          console.log('il te faut un gmail obligatoirement')
        } else {
          var new_user = {
            "email": user.email,
            "pass": user.mdp,
            "last_name": user.nom,
            "first_name": user.prenom,
            "pseudo": user.pseudo,
            "date": new Date(),
            "avatar": "",
            "profile": ""
          }

          UsersService.addUser(new_user).then(() => {
            this.connection(user.email, user.mdp);
          }).catch((error) => {
            this.errorMessage2 = error;
          });
        }
      };

      this.sendmail = function () {
        var mailto = {
          'message': {
            'from': 'inscription@WildCodeSchool.fr',
            'to': 'Adozrecrutementfr@gmail.com',
            'subject': 'Hola confirme ton adresse mail !',
            'html': 'YOUR EMAIL CONTENT HERE! YOU CAN USE HTML!',
            'text': 'text!'
          }
        }
        UsersService.mailSend(mailto).then((response) => { // j'envoye l'id et le token qui va avec
          console.log("Envoye du mail");
        }).catch((response) => {
          console.log("error");
        });
      }

      this.cookiee = $cookies.get('id'); //je déclare mon cookie dans une variable pour pouvoir faire des conditions trql

      this.getQuestion = () => {
        QuestionsService.QuestionAll().then((response) => { // j'envoye l'id et le token qui va avec
          self.questions = response.data;
        }).catch((response) => {
          self.error = response.statusText || "une erreur s'est produite pendant l'identification"; //en cas d'échec je marque un message d'erreur
        });
      }

      this.deconnexion = () => {
        this.DeleteCookie();
        $state.go($rootScope.oldRouteUser ? $rootScope.oldRouteUser : 'questions');
      }


      this.connection = (email, mdp) => { // on envoye les information qu'on a écrit dans les champs (ng-model)
        UsersService.userConnect(email, mdp).then((response) => { // j'envoye mon email et mon mot de passe à mon service qui utilise la fonction UserConnecy
          self.user = response.data; // je récupère cest donné si les information son bonne
          self.user.id = response.data["0"].id;

          ///SEND USERTOKEN
          self.tokenid = RandomTocken(); // on récupére le random générer
          var add = { // je crée une variable object pour l'ajouter dans ma db
            tokenSecure: self.tokenid
          }
           //je crée ma colonne et son contenue
          UsersService.userTokenAdd(self.user.id, add).then((response) => { // j'envoye l'id et le token qui va avec
              SendCookie(self.user.id, self.tokenid); // j'envoye le cookie avec l'userId
            }).catch((response) => {
              self.error = response.statusText || "une erreur s'est produite pendant l'identification"; //en cas d'échec je marque un message d'erreur
            });
            //END SEND USERTOKEN

          }).catch((response) => {
            self.error = response.statusText || "une erreur s'est produite pendant l'identification"; //en cas d'échec je marque un message d'erreur
          });
      }

      function SendCookie(id, token) { // on envoye le cookie avec l'id de connexion
        $cookies.put('id', '' + id + ''); // je crée mon cookie avec l'userId
        $cookies.put('tokenSecure', '' + token + ''); // je crée mon cookie avec l'userId
        $state.go($rootScope.oldRouteUser ? $rootScope.oldRouteUser : 'questions');
        $('#login').modal('close');
        $timeout(function () { $state.go($rootScope.oldRouteUser ? $rootScope.oldRouteUser : 'questions'); }, 0);
        self.cookieUser = $cookies.get('id'); //je déclare mon cookie dans une variable pour pouvoir faire des conditions trql
        self.cookieToken = $cookies.get('tokenSecure'); //je déclare mon cookie dans une variable pour pouvoir faire des conditions trql

      };

      this.DeleteCookie = () => { // on envoye le cookie avec l'id de connexion
        $cookies.remove('id');
        $cookies.remove('tokenSecure');
        this.cookieUser = null;
      };

      function RandomTocken() { // on génére notre random 
        return (Math.random() * 6000); // on génére un chiffre aléatoire
      };
      this.$onInit = () => {
        this.cookieUser = $cookies.get('id'); //je déclare mon cookie dans une variable pour pouvoir faire des conditions trql
        this.cookieToken = $cookies.get('tokenSecure'); //je déclare mon cookie dans une variable pour pouvoir faire des conditions trql

        function ajax() {

          $('.modal').modal();
          $(document).on('click', '.loginpop', function (event) {
            $('#login').modal('open');
          });
        }
        ajax()
        this.rebindDropDowns = function () {
          $('.dropdown-button').dropdown({ hover: true });
          $('.dropdown-button').dropdown('close');
          $('.button-collapse').sideNav();
          $('.collapsible').collapsible();
        };
      }


        this.getSearchQuestions = () => {
          var queryAsArray = this.searchQuery.split(' ');
          var queryAsString = queryAsArray.join('+');
          $state.go('questions', {
            queryParam: queryAsString
          });
        }
    }]
  });