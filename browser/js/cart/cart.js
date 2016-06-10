'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('cart', {
        url: '/cart/',
        controller: 'CartController',
        templateUrl: 'js/cart/cart.html'
    });

});

app.controller('CartController', function ($scope, Session, CartFactory) {

  console.log(Session)

});

app.factory('CartFactory', function ($http, $kookies) {

  var CartFactory = {};

  CartFactory.addToCart = function(inventoryId) {
    //Add inventory to req.session
    // inventoryId = String(inventoryId);
    // var qty = $kookies.get(inventoryId) || 0; 
    // $kookies.set(inventoryId, +qty + 1)
    // console.log($kookies.get());

    $http.post('/api/cart/add', {id: inventoryId})
    .then(function(cart){
      return cart;
    })
  }



  return CartFactory;

});