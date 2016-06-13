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

    $stateProvider.state('inventory-reviews', {
        url: '/admin/inventory/:id/reviews',
        templateUrl: 'js/admin/inventory-reviews.html',
        controller: 'EditReviewController',
        resolve: {
          editingItem: function(InventoryFactory, $stateParams) {
            return InventoryFactory.fetchById($stateParams.id)
          },
          reviews: function(InventoryFactory, $stateParams) {
            return InventoryFactory.fetchReviewsById($stateParams.id)
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
        controller: 'UserController',
        resolve: {
          users: function(AdminFactory) {
            return AdminFactory.fetchAllUsers()
          } 
        }
    });

    $stateProvider.state('edit-user', {
        url: '/admin/users/:id',
        templateUrl: 'js/admin/edit-user.html',
        controller: 'EditUserController',
        resolve: {
          editingUser: function(AdminFactory, $stateParams) {
            return AdminFactory.fetchUserById($stateParams.id)
          }
        }
    });

    $urlRouterProvider.when("/admin", "admin/inventory")

});

app.controller('AdminController', function ($scope, InventoryFactory, AdminFactory) {

    InventoryFactory.fetchAll()
    .then(function(items) {
      $scope.items = items;
    })

    $scope.confirmDelete = AdminFactory.confirmDeleteItem;

    $scope.add = AdminFactory.addItem

});

app.controller('EditController', function ($scope, editingItem, AdminFactory) {

    $scope.editingItem = editingItem;

    $scope.edit = AdminFactory.editItem

});

app.controller('EditUserController', function ($scope, editingUser, AdminFactory) {

    $scope.editingUser = editingUser;

    $scope.edit = AdminFactory.editUser

});

app.controller('EditReviewController', function ($scope, editingItem, AdminFactory, reviews, $state) {

    $scope.editingItem = editingItem;

    $scope.edit = AdminFactory.edit;

    $scope.reviews = reviews;

    $scope.confirmDelete = AdminFactory.confirmDeleteReview;

});

app.controller('UserController', function ($scope, users) {

    $scope.users = users;

});

app.factory('AdminFactory', function ($http, $state) {

    var AdminFactory = {};

    AdminFactory.editItem = function(id, data) {
      $http.put('/api/inventory/' + id, data)
      $state.go('inventory')
    }

    AdminFactory.editUser = function(id, data) {
      $http.put('/api/members/' + id, data)
      $state.go('users')
    }

    AdminFactory.addItem = function(data) {
      console.log(data);
      $http.post('/api/inventory/', data)
      $state.go($state.current, {}, {reload: true})
    }

    AdminFactory.confirmDeleteReview = function(id) {
      var ok = confirm("Delete this review?");
      if (ok) {
        $http.delete('/api/inventory/reviews/' + id);
        $state.go($state.current, {}, {reload: true})
      }
    }

    AdminFactory.confirmDeleteItem = function(id) {
      var ok = confirm("Delete this item?");
      if (ok) {
        $http.delete('/api/inventory/' + id);
        $state.go($state.current, {}, {reload: true})
      }
    }

    AdminFactory.fetchAllUsers = function() {
      return $http.get('api/members')
      .then(function(response) {
        return response.data
      })
    }

    AdminFactory.fetchUserById = function(id) {
      return $http.get('api/members/' + id)
      .then(function(response) {
        return response.data
      })
    }

    return AdminFactory

});
