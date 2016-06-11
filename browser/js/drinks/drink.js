app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('drinks', {
        url: '/drinks',
        controller: 'DrinksController',
        templateUrl: 'js/drinks/drinks.html',
        resolve: {
        	allDrinks: function(InventoryFactory) {
        		return InventoryFactory.fetchByType('drink');
        	}
        }
    });

    $stateProvider.state('drinkItem', {
        url: '/drinks/:id',
        controller: 'DrinkController',
        templateUrl: 'js/drinks/drink.html',
        resolve: {
          drinkItem: function (InventoryFactory, $stateParams) {
            return InventoryFactory.fetchById($stateParams.id);
          }
        }
    });

});

app.controller('DrinksController', function ($scope, allDrinks) {

    $scope.drinks = allDrinks;

});

app.controller('DrinkController', function ($scope, drinkItem) {
    
    $scope.drinkItem = drinkItem;

});