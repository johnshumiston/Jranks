'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('cart', {
        url: '/cart/',
        controller: 'CartController',
        templateUrl: 'js/cart/cart.html',
        resolve: {
          theSession: function (CartFactory) {
            return CartFactory.getSession();
          },
          cartItems: function(CartFactory) {
            return CartFactory.fetchAllInCart();
          }
        }
    });

});

app.controller('CartController', function ($scope, Session, theSession, InventoryFactory, cartItems) {

  console.log(Session)

  $scope.cartItems = cartItems;
  

});

app.factory('CartFactory', function ($http) {

  var CartFactory = {};

  CartFactory.getSession = function() {
    return $http.get('/api/cart')
    .then(function(session) {
      return session.data;
    })
  }

  CartFactory.fetchAllInCart = function() {
    return $http.get('/api/cart/myCart')
    .then(function(response) {
      console.log("hello", response.data)
      return response.data
    })
  }

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