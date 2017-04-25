'use strict';
SERVICES.service('authService', ['$cookies', 'UsersService', '$state', function ($cookies, UsersService, $state) {

    this.VerificationConnection = () => {
        var userid = $cookies.get('id');
        var token = $cookies.get('tokenSecure');
        if (!userid) {
            DeleteCookie();
            this.msg = false
        }
        if (!token) {
            DeleteCookie();
            this.msg = false
        }

        UsersService.verifToken(userid, token).then((response) => {
            if (response.data['0'].tokenSecure != token && response.data['0'].id != userid) {
                DeleteCookie();
                this.msg = false
            } else {
                this.msg = true;
            }
        }).catch((response) => {
            DeleteCookie();
            this.msg = false
        });

        return this.msg;
    }

    function DeleteCookie() { // on envoye le cookie avec l'id de connexion
        $cookies.remove('id');
        $cookies.remove('tokenSecure');
    };

    this.getCurrentUser = () => {
        return {
            id: $cookies.get('id')
        }
    }

}]);