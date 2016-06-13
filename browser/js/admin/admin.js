app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('admin', {
        url: '/admin/',
        templateUrl: 'js/admin/admin.html',
        controller: 'AdminController'
    });

    $stateProvider.state('inventory', {
        url: '/admin/inventory',
        templateUrl: 'js/admin/inventory.html',
        controller: 'AdminController'
    });

    $stateProvider.state('edit-inventory', {
        url: '/admin/inventory/:id',
        templateUrl: 'js/admin/edit-inventory.html',
        controller: 'EditController',
        resolve: {
          editingItem: function(InventoryFactory, $stateParams) {
            return InventoryFactory.fetchById($stateParams.id)
          }
        }
    });

    $stateProvider.state('orders', {
        url: '/admin/orders',
        templateUrl: 'js/admin/orders.html',
        controller: 'AdminController'
    });

    $stateProvider.state('users', {
        url: '/admin/users',
        templateUrl: 'js/admin/users.html',
        controller: 'AdminController'
    });

    $urlRouterProvider.when("/admin", "admin/inventory")

});

app.controller('AdminController', function ($scope, InventoryFactory) {

    InventoryFactory.fetchAll()
    .then(function(items) {
      $scope.items = items;
    })

});

app.controller('EditController', function ($scope, editingItem, AdminFactory) {

    $scope.editingItem = editingItem;

    $scope.edit = AdminFactory.edit

});

app.factory('AdminFactory', function ($http) {

    var AdminFactory = {};

    AdminFactory.edit = function(id, data) {
      $http.put('/api/inventory/' + id, data)
    }

    return AdminFactory

});