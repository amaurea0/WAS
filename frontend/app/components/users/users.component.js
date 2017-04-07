'use strict';

/**
 * The connectUsers component
 */
COMPNT.component('userCreate', {

        templateUrl: '/app/components/users/signup.html',

        bindings: {
            user: '<'
        },

        controller: ['UsersService',

            function (UsersService) {

                // Save the new user
                this.addUser = (user) => {
                    UsersService.addUser(user).then(() => {
                        //$state.go('index');
                        console.log('users.component');
                    }).catch((err) => { });
                };
            }
        ]

        /*this.user = {};
        this.user['email'] = $ctrl.user.email;
        this.user['password'] = $ctrl.user.password;
        this.message = "";/*
 
     
 
            if (!$ctrl.user.email.indexOf('@') != -1 && !$ctrl.user.email.indexOf('.') != -1) {
                this.message = "Saisis une adresse mail correcte, stp";
            }
            if ($ctrl.user.email == "" || $ctrl.user.password == "" || $ctrl.user.passwordVerif == "") {
                this.message = "Remplis tous les champs stp";
            }
            if ($ctrl.user.password != $ctrl.user.passwordVerif) {
 
                this.message = "Tes mots de passe sont différents";
            }
            else {*/
        // $ctrl.user ='';
    });
