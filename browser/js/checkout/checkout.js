'use strict';

app.config(function ($stateProvider) {
    
    $stateProvider.state('checkout', {
        url: '/checkout',
        controller: 'CheckoutController',
        templateUrl: 'js/checkout/checkout.html'
    });

});

app.controller('CheckoutController', function ($scope, CartFactory) {

  CartFactory.getGrandTotal()
  .then (function (total){
    $scope.grandTotal = total;
  })

  $scope.test = "test";
  // $scope.grandTotal = cartItems.reduce(function(sum, item){
  //       return sum + (item.price * item.qty);
  //   }, 0);
  
  // $scope.formatPrice = CartFactory.formatPrice;
});