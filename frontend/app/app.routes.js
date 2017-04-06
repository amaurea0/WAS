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

    var createUserState ={
        name: 'addUser',
        url: '/addUser',
        component: 'userCreate',
        resolve: {}
    }

    $stateProvider.state(questionsState);
    $stateProvider.state(usersState);
     $stateProvider.state(createUserState);
});