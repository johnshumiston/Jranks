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

app.controller('FoodController', function ($scope, foodItem) {

  $scope.foodItem = foodItem;

});

app.factory('InventoryFactory', function ($http) {

  var InventoryFactory = {};

  InventoryFactory.fetchByType = function(type) {
    return $http.get('/api/inventory/?type=' + type)
    .then(function(response){
      return response.data;
    });
  };

  InventoryFactory.fetchById = function(id) {
    return $http.get('/api/inventory/' + id)
    .then(function(response){
      return response.data;
    });
  };

  return InventoryFactory;

});

// app.directive('inventoryTable', function(){

// })