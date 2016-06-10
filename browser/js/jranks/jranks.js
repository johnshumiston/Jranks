app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('jranks', {
        url: '/jranks',
        controller: 'JranksController',
        templateUrl: 'js/jranks/jranks.html',
        resolve: {
        	allJranks: function(InventoryFactory) {
        		return InventoryFactory.fetchByType('alcoholic_drink');
        	}
        }
    });

    $stateProvider.state('jrankItem', {
        url: '/jranks/:jrankId',
        controller: 'JrankController',
        templateUrl: 'js/jranks/jrank.html',
        resolve: {
          jrankItem: function (InventoryFactory, $stateParams) {
            return InventoryFactory.fetchById($stateParams.jrankId);
          }
        }
    });

});

app.controller('JranksController', function ($scope, allJranks) {

    $scope.jranks = allJranks;

});

app.controller('JrankController', function ($scope, jrankItem) {
    
    $scope.jrankItem = jrankItem;

});