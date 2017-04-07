'use strict';

WEA.config(function ($stateProvider) {
    var questionsState = {
        name: 'questions',
        url: '/questions',
        component: 'questionsList',
        resolve: {}
    };

    var usersState = {
        name: 'users',
        url: '/users',
        component: 'usersList',
        resolve: {}
    };

    var questionPostState = {
        name: 'questionPost',
        url: '/post',
        component: 'questionPost',
        resolve: {}
    };

    var nuageState = {
        name: 'nuage',
        url: '/nuage',
        component: 'nuage',
        resolve: {}
    };

    var createUserState ={
        name: 'addUser',
        url: '/addUser',
        component: 'userCreate',
        resolve: {}
    }
    var loginUserState ={
        name: 'logUser',
        url: '/logUser',
        component: 'userLogin',
        resolve: {}
    }

    $stateProvider.state(questionsState);
    $stateProvider.state(usersState);
    $stateProvider.state(questionPostState);
    $stateProvider.state(nuageState);
    $stateProvider.state(createUserState);
    $stateProvider.state(loginUserState);

});

