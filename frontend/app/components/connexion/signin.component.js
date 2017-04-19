angular.module('wild.components').component('userLogin', {

  templateUrl: '/frontend/app/components/connexion/signin.html',

  bindings: {

    user: '<',
    error: '@',
    cookieUser: '<',
    cookieToken: '<',
    msgVerifToken: '<',
    cookieUser: '<'


  },

  controller: ['UsersService', '$cookies', 'QuestionsService', function (UsersService, $cookies, QuestionsService) {


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

    this.cookiee = $cookies.get('id'); //je déclare mon cookie dans une variable pour pouvoir faire des conditions trql

    this.getQuestion = () => {
      QuestionsService.QuestionAll().then((response) => { // j'envoye l'id et le token qui va avec
        self.questions = response.data;
      }).catch((response) => {
        self.error = response.statusText || "une erreur s'est produite pendant l'identification"; //en cas d'échec je marque un message d'erreur
      });
    }


    this.connection = (email, mdp) => { // on envoye les information qu'on a écrit dans les champs (ng-model)
      UsersService.userConnect(email, mdp).then((response) => { // j'envoye mon email et mon mot de passe à mon service qui utilise la fonction UserConnecy
        self.user = response.data; // je récupère cest donné si les information son bonne
        self.user.id = response.data["0"].id;

        ///SEND USERTOKEN
        self.tokenid = RandomTocken(); // on récupére le random générer
        var add = { // je crée une variable object pour l'ajouter dans ma db
          tokenSecure: self.tokenid //je crée ma colonne et son contenue
        };
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
      self.cookieUser = $cookies.get('id'); //je déclare mon cookie dans une variable pour pouvoir faire des conditions trql
      self.cookieToken = $cookies.get('tokenSecure'); //je déclare mon cookie dans une variable pour pouvoir faire des conditions trql

    };

    function DeleteCookie() { // on envoye le cookie avec l'id de connexion
      $cookies.remove('id');
      $cookies.remove('tokenSecure');
      $location.path("/index");
    };



    function RandomTocken() { // on génére notre random 
      return (Math.random() * 6000); // on génére un chiffre aléatoire
    };

  }]

});
