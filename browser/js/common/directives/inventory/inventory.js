'use strict';

app.directive('inventory', function (CartFactory) {
  return {
    restrict: 'E',
    scope: {
      type: '='
    },
    templateUrl: 'js/common/directives/inventory/inventory.html',
    link: function(scope) {
      scope.addToCart = CartFactory.addToCart
    }
  }
});