app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('reset', {
        url: '/reset',
        controller: 'ResetController',
        templateUrl: 'js/reset/reset.html'
    });

});

app.controller('ResetController', function ($scope, ResetFactory) {

    $scope.resetPassword = ResetFactory.reset;

});

app.factory('ResetFactory', function ($http) {
    
    var ResetFactory = {};

    ResetFactory.reset = function(data) {
      return $http.put('/api/reset', data)
      .then(function(response) {
        return response.data
      })   
    }

    return ResetFactory;

});