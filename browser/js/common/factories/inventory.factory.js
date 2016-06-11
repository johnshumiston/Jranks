app.factory('InventoryFactory', function ($http) {

  var InventoryFactory = {};

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

  InventoryFactory.fetchReviewsById = function(id) {
    return $http.get('/api/inventory/' + id + '/reviews')
    .then(function(response) {
      return response.data
    })
  }

  return InventoryFactory;

});