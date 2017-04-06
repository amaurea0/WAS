'use strict';

/**
 * The connectUsers component
 */
COMPNT.component('userCreate', {

    templateUrl: '/app/components/users/signup.html',

    bindings: {
        user: '<'
    },

    controller: ['usersService',

        function (usersService) {
            var self = this;
            
            var userAdd = {};
            this.verif = (user) => {
                if (user.password != user.passwordConfirm) {

                    self.message = "Tes mots de passe sont différents";
                    console.log("mot de pass erroné");
                    this.userPassword="";
                } else {          // Save the new user
                    userAdd = {
                        'email' : user.email,
                        'password' : user.password
                    }
                        usersService.addUser(userAdd).then(() => {
                            //$state.go('index');
                            console.log('yEEESSSS!');
                        }).catch((err) => { });
                    
                }
            }
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
