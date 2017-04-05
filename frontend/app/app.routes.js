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
    }

    $stateProvider.state(questionsState);
    $stateProvider.state(usersState);
});