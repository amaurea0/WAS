'use strict';

WEA.controller('main', function (authService, $rootScope, $state) {

    this.isAuthenticated = authService.VerificationConnection() == true;

    $rootScope.$on('AUTH', (event, connected) => {
          this.isAuthenticated = authService.VerificationConnection() == true;
      if (!isAuthenticated) {
        $state.go('home');
      }
    });


  });