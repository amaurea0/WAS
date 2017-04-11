'use strict';

COMPNT.component("profil", {

	templateUrl: './app/components/profil/profil.html',

	controller: ['UserProfileService',

	 function(UserProfileService) {
		var self = this;
		this.identify = () =>{
				var promise = UserProfileService.userId(1);
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