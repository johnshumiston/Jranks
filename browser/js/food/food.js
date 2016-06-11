'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('food', {
        url: '/food/',
        controller: 'FoodsController',
        templateUrl: 'js/food/food.html',
        resolve: {
          allFood: function (InventoryFactory) {
            return InventoryFactory.fetchByType('food');
          }
        }
    });

    $stateProvider.state('foodItem', {
        url: '/food/:foodId',
        controller: 'FoodController',
        templateUrl: 'js/food/foodItem.html',
        resolve: {
          foodItem: function (InventoryFactory, $stateParams) {
            return InventoryFactory.fetchById($stateParams.foodId);
          }
        }
    });

});

app.controller('FoodsController', function ($scope, allFood) {

    $scope.foods = allFood;

});

app.controller('FoodController', function ($scope, foodItem, CartFactory) {

  $scope.foodItem = foodItem;

  $scope.addToCart = CartFactory.addToCart;
  //function(item) {return CartFactory.addToCart(item)};

});