'use strict';

app.directive('inventory', function (CartFactory, InventoryFactory, $stateParams) {
  return {
    restrict: 'E',
    scope: {
      type: '='
    },
    templateUrl: 'js/common/directives/inventory/inventory.html',
    link: function(scope) {
      scope.addToCart = function(item){
          CartFactory.addToCart(item)
          .then(function(){
            return InventoryFactory.showAddButton($stateParams.id)
          })
          .then(function(availability){
            scope.showAddButton = availability.data;
          })
      }

      scope.starThing = function(num){
        return "width: " + num*20+ "%";
      }

      scope.addReview = function(review){
        InventoryFactory.addReview(review)
      }
      
      InventoryFactory.showAddButton($stateParams.id)
      .then(function(availability){
        scope.showAddButton = availability.data;
      })

      InventoryFactory.fetchReviewsById($stateParams.id)
      .then(function(reviews){
        scope.reviews=reviews;
        scope.newReview = {};
        scope.newReview.inventoryId = $stateParams.id;
      })
    }
  }
});
