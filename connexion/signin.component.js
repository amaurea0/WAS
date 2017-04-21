'use strict';

/**
 * The connectUsers component
 */
COMPNT.component('userLogin', {

    templateUrl: '/frontend/app/components/connexion/signin.html',

    bindings: {},

    controller: function ($auth) {

        var user = {
            email: this.user.email,
            password: this.user.password
        };

        $auth.login(user)
            .then(function (response) {
                // Redirect user here after a successful log in.
            })
            .catch(function (response) {
                // Handle errors here, such as displaying a notification
                // for invalid email and/or password.
            });

        this.isAuthenticated = function () {
            return $auth.isAuthenticated();
        };
    }
});