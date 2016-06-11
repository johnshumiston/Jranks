'use strict';

app.directive('inventory', function (CartFactory, InventoryFactory, $stateParams) {
  return {
    restrict: 'E',
    scope: {
      type: '='
    },
    templateUrl: 'js/common/directives/inventory/inventory.html',
    link: function(scope) {
      scope.addToCart = CartFactory.addToCart;

      scope.starThing = function(num){
        return "width: " + num*20+ "%";
      }
      

      InventoryFactory.fetchReviewsById($stateParams.id)
      .then(function(reviews){
        scope.reviews=reviews;
      })
    }
  }
});
