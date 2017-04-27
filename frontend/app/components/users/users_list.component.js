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

            this.pageSize = 4;
            this.currentPage = 1;

            this.pageChangeHandler = (num) => {
                console.log('going to page ' + num);
            };

            this.model = {
                list: [],
                query: ''
            };
        }]
    })