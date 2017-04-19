'use strict';

/**
 * The connectUsers component
 */
COMPNT.component('userCreate', {

    templateUrl: '/frontend/app/components/connexion/signup.html',

    bindings: {
        user: '<'
    },

    controller: ['UsersService', '$scope',  '$state', 'INFO',

        function (UsersService, $scope,  $state, INFO) {
            var self = this;
            var regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
            var userAdd = {};
            this.verif = (user) => {

                if (user == undefined) {
                    console.log("CHAMPS !!!!");
                    self.messageAll = "Remplis tous les champs stp";
                }
                else if (!regex.test(user.email)) {
                    self.messageEmail = "Saisis une adresse mail correcte, stp";
                    console.log("EMAIL erroné");
                }

                else if (user.password != user.passwordConfirm) {
                    self.messagePass = "Mot de passe erroné";
                    console.log("PASS erroné");
                    //     /*user.password = "";
                    //    user.passwordConfirm = "";*/
                }

                else {  // Save the new user
                    self.messagePass = "";
                    self.messageEmail = "";
                    userAdd = {
                        'email': user.email,
                        'password': user.password
                    }

                    UsersService.addUser(userAdd).then(() => {
                        UsersService.get(user.email).then((data) => {
                            $scope.$emit(INFO.userId, data[0].id);
                            console.log(data[0].id)
                        }); console.log('yEEESSSS!');
                        //faire passer par le main pour sauver la variable globale
                        $state.go('main');
                    }).catch((err) => { });
                };


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
