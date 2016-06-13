app.directive('adminNavbar', function ($state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/admin-navbar/admin-navbar.html',
        link: function (scope) {

            scope.items = [
                { label: 'Inventory', state: 'inventory' },
                { label: 'Orders', state: 'orders'},
                { label: 'Users', state: 'users' },                
            ];

        }

    };

});