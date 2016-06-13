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
    return $http.get('/api/inventory/' + id + '/reviews')
    .then(function(response) {
      return response.data
    })
  }

  return InventoryFactory;

});