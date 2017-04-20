'use strict';

WEA.component('login', {

    templateUrl: '/frontend/app/components/connexion/login.html',

    bindings: {
      redirect: '<'
    },

    controller: function (AuthService, $state) {

      this.$onInit = () => {
        this.errorMessage = '';
        this.user = {};
      };

      this.submit = (user) => {
          console.log(user)

        this.errorMessage = '';

        if (typeof user.name != 'undefined') {
          AuthService.createUser(user).then(() => {
            $state.go(this.redirect ? this.redirect : 'questions');
          }).catch(() => {
            this.errorMessage = `Une erreur s'est produite`;
          });
        } else {
          AuthService.connect(user.email, user.password).then(() => {
            console.log(this.redirect)
            $state.go(this.redirect ? this.redirect : 'questions');
          }).catch(() => {
            this.errorMessage = `Utilisateur introuvable ou mot de passe invalide`;
          });
        }
      };
    }
  });