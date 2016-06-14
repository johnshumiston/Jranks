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
            scope.showAddButton = availability;
          })
          .then(function(){
            return InventoryFactory.showQtyNumber($stateParams.id)
          })
          .then(function(qty){
            scope.qtyAvail = qty;
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
        scope.showAddButton = availability;
      })

      InventoryFactory.showQtyNumber($stateParams.id)
      .then(function(qty){
        scope.qtyAvail = qty;
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
