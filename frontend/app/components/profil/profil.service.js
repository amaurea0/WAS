SERVICES.service('userprofileservce', function($http) {
	this.userId = (id) => {
		return $http.get('http://127.0.0.1:3000/users/' + id);
	};
});