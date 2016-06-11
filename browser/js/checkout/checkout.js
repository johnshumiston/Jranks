'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('checkout', {
        url: '/checkout/',
        // controller: 'CheckoutController',
        templateUrl: 'js/checkout/checkout.html',
        // resolve: {
        //   theSession: function (CheckoutFactory) {
        //     return CheckoutFactory.getSession();
        //   },
        //   cartItems: function(CartFactory) {
        //     return CartFactory.fetchAllInCart();
        //   }
        // }
    });

});

// app.controller('CheckoutController', function ($scope, Session, theSession, InventoryFactory, cartItems, CartFactory, CheckoutFactory) {

//   console.log(Session)

//   $scope.cartItems = cartItems;
//   $scope.grandTotal = cartItems.reduce(function(sum, item){
//     return sum + (item.price * item.qty);
//   }, 0)
//   $scope.formatPrice = CartFactory.formatPrice;

// });

// app.factory('CheckoutFactory', function ($http) {

//   var CheckoutFactory = {};

//   // CartFactory.formatPrice = function(price) {
//   //   var priceStr = String(price);
//   //   if (priceStr.length < 3) priceStr = ("00" + priceStr).slice(-3)
//   //   return "$" + priceStr.slice(0, -2) + "." + priceStr.slice(-2);
//   // }



//   return CartFactory;

// });