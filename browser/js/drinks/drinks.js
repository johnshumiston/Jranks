app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('drinks', {
        url: '/drinks',
        controller: 'DrinksController',
        templateUrl: 'js/drinks/drinks.html'
    });

});

app.controller('DrinksController', function ($scope) {



});