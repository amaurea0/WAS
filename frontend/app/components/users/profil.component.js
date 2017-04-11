'use strict';

COMPNT.component("profil", {

	templateUrl: './app/components/users/profil.html',

	controller: ['UsersService',

	 function(UsersService) {
		var self = this;
		this.identify = () =>{
				var promise = UsersService.userId(1);
				promise.then(
					function(user) { 
						 self.userProfil = user.data;
					},
					function(error) {
						 console.log(error);
					});
			}

	}]
});