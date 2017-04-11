'use strict';


COMPNT
    .component("usersList", {

        templateUrl: '/app/components/users_list/users_list.html',

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