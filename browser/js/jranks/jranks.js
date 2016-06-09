app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('jranks', {
        url: '/jranks',
        controller: 'JranksController',
        templateUrl: 'js/jranks/jranks.html'
    });

});

app.controller('JranksController', function ($scope) {



});