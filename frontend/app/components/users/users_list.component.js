'use strict';


COMPNT
    .component("usersList", {

        templateUrl: '/frontend/app/components/users/users_list.html',

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
        }]
    })