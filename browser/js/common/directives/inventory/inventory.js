'use strict';

app.directive('inventory', function (CartFactory, InventoryFactory, $stateParams, $state) {
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

      scope.addReview = function(review){
        console.log(review)
        InventoryFactory.addReview(review)
      }
      
      InventoryFactory.fetchReviewsById($stateParams.id)
      .then(function(reviews){
        scope.reviews=reviews;
        scope.newReview = {};
        scope.newReview.inventoryId = $stateParams.id;
      })
    }
  }
});
