'use strict';

WEA.config(function ($stateProvider) {
    $stateProvider

        .state({
            name: 'questions',
            url: '/questions',
            component: 'questionsList',
            resolve: {}
        })

        .state({
            name: 'users',
            url: '/users',
            component: 'usersList',
            resolve: {
                users: function ($rootScope, UsersService) {
                    return UsersService.getUsers();
                }
            }
        })

        .state({
            name: 'tags',
            url: '/questions/:tagId/:tagName',
            component: 'questionsList',
            resolve: {
                tagFilter: function ($stateParams) {
                    return {
                        tagId: $stateParams.tagId,
                        tagName: $stateParams.tagName
                    }
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
            name: 'questionSpec',
            url: '/questions/{idQuestion}',
            component: 'questionFull',
            resolve: {
                question: function ($rootScope, QuestionsService, $transition$) {
                    var nb_view;
                    var id_question = $transition$.params().idQuestion;
                    QuestionsService.getSpecificQuestion(id_question).then((resp) => {
                        nb_view = resp.nb_views + 1;
                        QuestionsService.viewQuestion(id_question, {
                            "nb_views": nb_view
                        }).then((rep) => {})
                    }).catch((err) => {});

                    return QuestionsService.getSpecificQuestion(id_question);
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
            name: 'logUser',
            url: '/logUser',
            component: 'userLogin',
            resolve: {}
        })

        .state({
            name: 'questionSpec.postAnswer',
            url: '/newAnswer',
            component: 'answerPost',
            resolve: {}
        })

        .state({
            name: 'editPost',
            url: '/edit/{postId}',
            component: 'editPost',
            resolve: {
                post: function ($rootScope, QuestionsService, $transition$) {
                    return QuestionsService.getSpecificQuestion($transition$.params().postId);
                }
            }
        })


        .state({
            name: 'tips',
            url: '/tips',
            component: 'tips',
            resolve: {}
        })

        .state({
            name: 'tips.postTip',
            url: '/post',
            component: 'postTip',
            resolve: {}
        })
});