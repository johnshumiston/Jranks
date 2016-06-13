app.factory('InventoryFactory', function ($http, $state) {

  var InventoryFactory = {};

  InventoryFactory.fetchAll = function() {
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
    console.log("FACTORY FETCH REVIEWS BY ID")
    return $http.get('/api/inventory/' + id + '/reviews')
    .then(function(response) {
      return response.data
    })
  }

  InventoryFactory.showAddButton = function(inventoryId){
    console.log("CALLED INVENTORY FACTORY SHOW ADD BUTTON");
    return $http.get('/api/inventory/available/' + inventoryId)
    .then(function(availability){
      console.log("IT GETS TO INVENTORY FACTORY SHOW ADD BUTTON")
      return availability;
    })
  };

  return InventoryFactory;

});