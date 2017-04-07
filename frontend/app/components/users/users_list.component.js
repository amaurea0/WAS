'use strict';


COMPNT
    .component("usersList", {

        templateUrl: '/app/components/users/users_list.html',

        bindings: {
            list: '<',
            query: '@',
            users: '<'
        },

        controller: ['UsersService', function (UsersService) {

            this.model = {
                list: [],
                query: ''
            };

            this.$onInit = () => {
                this.getAllUsers();
            };

            this.getAllUsers = () => {
                UsersService.getUsers().then((items) => {
                    this.model.list = items.data;
                    console.log(items.data);
                }).catch((err) => {});

                //         QuestionsListService.getUser(userId).then {
                //   return $http.get(API_URL + '/users/' + userId);
                // }
            };
        }]
    })