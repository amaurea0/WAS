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

        this.submitConnexion = (user) => {
            console.log(user)

            this.errorMessage = '';

            AuthService.connect(user.email, user.password).then(() => {
                console.log(this.redirect)
                $state.go(this.redirect ? this.redirect : 'questions');
            }).catch(() => {
                this.errorMessage = `Utilisateur introuvable ou mot de passe invalide`;
            });

        };

        this.submitCreation = (user) => {
            console.log(user)

            this.errorMessage = '';

            var new_user = {
                "email": user.email,
                "pass": user.password,
                "last_name": "",
                "first_name": "",
                "pseudo": user.pseudo,
                "date": new Date(),
                "avatar": "",
                "profile": ""
            }

            AuthService.createUser(new_user).then(() => {
                $state.go(this.redirect ? this.redirect : 'questions');
            }).catch(() => {
                this.errorMessage = `Une erreur s'est produite`;
            });

        };
    }
});