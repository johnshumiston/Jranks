'use strict';

app.config(function ($stateProvider) {
    
    $stateProvider.state('checkout', {
        url: '/checkout',
        controller: 'CheckoutController',
        templateUrl: 'js/checkout/checkout.html',
        resolve: {
          grandTotal: function(CartFactory){
            return CartFactory.getGrandTotal();
          }
        }
    });

});

app.controller('CheckoutController', function ($scope, CartFactory, grandTotal) {

  $scope.grandTotal = grandTotal;

  $scope.test = "test";
  
});