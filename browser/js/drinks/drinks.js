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
        url: '/drink/:drinkId',
        controller: 'DrinkController',
        templateUrl: 'js/drink/drinkItem.html',
        resolve: {
          drinkItem: function (InventoryFactory, $stateParams) {
            return InventoryFactory.fetchById($stateParams.drinkId);
          }
        }
    });

});

app.controller('DrinksController', function ($scope) {



});