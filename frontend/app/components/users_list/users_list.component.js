'use strict';


COMPNT
    .component("usersList", {

        templateUrl: '/app/components/users_list/users_list.html',

        bindings: {
            list: '<',
            query: '@',
            users: '<'
        },

        controller: ['UsersListService', function (UsersListService) {

            this.model = {
                list: [],
                query: ''
            };

            this.$onInit = () => {
                this.getAllUsers();
            };

            this.getAllUsers = () => {
                UsersListService.getUsers().then((items) => {
                    this.model.list = items.data;
                    console.log(items.data);
                }).catch((err) => {});

                //         QuestionsListService.getUser(userId).then {
                //   return $http.get(API_URL + '/users/' + userId);
                // }
            };
        }]
    })