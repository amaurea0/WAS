'use strict';

COMPNT.component("profil", {

	templateUrl: './app/components/profil/profil.html',

	controller: ['userprofileservce',

	 function(userprofileservce) {
		var self = this;
		this.tesst = () =>{
				var promise = userprofileservce.userId(1);
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