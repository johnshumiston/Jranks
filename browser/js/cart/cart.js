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

app.controller('CartController', function ($scope, $rootScope, Session, InventoryFactory, cartItems, CartFactory, $state) {

  CartFactory.fetchAllInCart()
  .then(function(items){
    $scope.cartItems = items; 
  })

  CartFactory.getGrandTotal()
  .then (function (total){
    $scope.grandTotal = total;
  })

  $scope.itemsToUpdate = {};

  $scope.updateItemQty = CartFactory.updateItemQty;

  $scope.removeItem = CartFactory.removeItem;
  
  // cartItems.forEach(function(item){
  //   CartFactory.showQtyNumber(item.id)
  //   console.log(item.id)
  //   .then(function(qty){
  //     console.log(qty)
  //     item.qtyAvail = qty;
  //   })
  // })

  $scope.showQtyNumber = CartFactory.showQtyNumber

  $scope.formatPrice = CartFactory.formatPrice;

});

app.factory('CartFactory', function ($http, $state) {

  var CartFactory = {};

  CartFactory.getGrandTotal = function(){
    return CartFactory.fetchAllInCart()
    .then(function(items){
      return items.reduce(function(sum, item){
        return sum + (item.price * item.qty);
    }, 0)});
  }

  CartFactory.getSession = function() {
    return $http.get('/api/cart')
    .then(function(session) {
      return session.data;
    })
  }

  CartFactory.fetchAllInCart = function() {
    return $http.get('/api/cart/myCart')
    .then(function(response) {
      return response.data
    })
  }

  CartFactory.addToCart = function(item) {
    var qty = +item.qty;
    return $http.post('/api/cart/add', {id: item.id, qty: qty})
    .then(function(cart){
      return cart;
    })
  }

  CartFactory.formatPrice = function(price) {
    var priceStr = String(price);
    if (priceStr.length < 3) priceStr = ("00" + priceStr).slice(-3)
    return "$" + priceStr.slice(0, -2) + "." + priceStr.slice(-2);
  }

  CartFactory.updateItemQty = function(items) {
    return $http.put('/api/cart/update', items)
    .then(function(){
      $state.go($state.current, {}, {reload: true})
    })
  }

  CartFactory.removeItem = function(item) {
    $http.put('/api/cart/delete', {id: item.id})
    .then(function(cart){
      $state.go($state.current, {}, {reload: true})
    })
  }

  CartFactory.showQtyNumber = function(itemId){
    return $http.get('/api/inventory/available/' + itemId)
    .then(function(res){
      return res.data.qtyAvailable;
    })
  };

  return CartFactory;

});

app.directive('checkoutscript', function (CartFactory, InventoryFactory, $stateParams) {
  return {
    restrict: 'E',
    scope: {
      type: '='
    },
    templateUrl: 'js/cart/checkout.html',
    link: function(scope) {

      CartFactory.getGrandTotal()
      .then (function (total){
        scope.grandTotal = total;
      })
    }
  }
});
