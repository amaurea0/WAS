WEA.run(function (authService, $log, $state, $transitions, $rootScope, $cookies) {

    // ui-router transitions

    $transitions.onBefore({}, (transition) => {

        // Get the requested route
        var to = transition.to();

        this.cookieUser = $cookies.get('id'); //je déclare mon cookie dans une variable pour pouvoir faire des conditions trql
        this.cookieToken = $cookies.get('tokenSecure'); //je déclare mon cookie dans une variable pour pouvoir faire des conditions trql

        if (to.authenticate && authService.VerificationConnection() == false) {

            console.log("Aucun utilisateur");
            $rootScope.oldRouteUser = to.name
            console.log($rootScope.oldRouteUser);
            return transition.router.stateService.target("home", {});
        }
    });

});