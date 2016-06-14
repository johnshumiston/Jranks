app.factory('InventoryFactory', function ($http, $state) {

  var InventoryFactory = {};

  InventoryFactory.fetchAll = function() {
      window.confirm("Are you old enough to jrank?")
    return $http.get('/api/inventory')
    .then(function(response){
      return response.data;
    });
  };

  InventoryFactory.fetchByType = function(type) {
    return $http.get('/api/inventory/?type=' + type)
    .then(function(response){
      return response.data;
    });
  };

  InventoryFactory.fetchById = function(id) {
    return $http.get('/api/inventory/' + id)
    .then(function(response){
      return response.data;
    });
  };

  InventoryFactory.addReview = function(newReview) {
    $http.post('/api/inventory/reviews', newReview)
    .then(function(response){
      return response.data;
    })
    $state.go($state.current, {}, {reload: true})
  }

  InventoryFactory.fetchReviewsById = function(id) {
    return $http.get('/api/inventory/' + id + '/reviews')
    .then(function(response) {
      return response.data
    })
  }

  InventoryFactory.showAddButton = function(inventoryId){
    return $http.get('/api/inventory/available/' + inventoryId)
    .then(function(res){
      return res.data.veracity;
    })
  };

  InventoryFactory.showQtyNumber = function(inventoryId){
    return $http.get('/api/inventory/available/' + inventoryId)
    .then(function(res){
      return res.data.qtyAvailable;
    })
  };

  return InventoryFactory;

});
