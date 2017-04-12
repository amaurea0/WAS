'use strict';

WEA.config(function ($stateProvider) {
    $stateProvider

        .state({
            name: 'questionscomplet',
            url: '/questionscomplet',
            component: 'questionsComplet',
            resolve: {}
        })

        .state({
            name: 'questions',
            url: '/questions',
            component: 'questionsList',
            resolve: {
                
            }
        })

        .state({
            name: 'users',
            url: '/users',
            component: 'usersList',
            resolve: {
                users: function ($rootScope, UsersService, $transition$) {
                    return UsersService.getUsers($transition$.params().personId);
                }
            }
        })

        .state({
            name: 'person',
            url: '/users/{personId}',
            component: 'userProfile',
            resolve: {
                person: function ($rootScope, UsersService, $transition$) {
                    return UsersService.getPerson($transition$.params().personId);
                }
            }
        })

        .state({
            name: 'questionPost',
            url: '/post',
            component: 'questionPost',
            resolve: {}
        })

        .state({
            name: 'nuage',
            url: '/nuage',
            component: 'nuage',
            resolve: {}
        })

        .state({
            name: 'tags',
            url: '/questionscomplet/:tagId/:tagName',
            component: 'questionsComplet',
            resolve: {
                tagFilter: function ($stateParams) {
                    return {
                        tagId: $stateParams.tagId,
                        tagName: $stateParams.tagName
                    };
                }
            }
        })

        .state({
            name: 'addUser',
            url: '/addUser',
            component: 'userCreate',
            resolve: {}
        })

        .state({
            name: 'questionSpec',
            url: '/questions/{questionId}',
            component: 'questionFull',
            resolve: {
                question: function ($rootScope, QuestionsService, $transition$) {
                    return QuestionsService.getSpecificQuestion($transition$.params().questionId);
                }
            }
        })

        .state({
            name: 'logUser',
            url: '/logUser',
            component: 'userLogin',
            resolve: {}
        })

        .state({
            name: 'userprofile',
            url: '/userprofile',
            component: 'profil',
            resolve: {}
        });

});

