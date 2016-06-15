app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, CartFactory) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.items = [
                { label: 'Home', state: 'home' },
                { label: 'Food', state: 'food' },
                { label: 'Drinks', state: 'drinks' },
                { label: 'Jranks', state: 'jranks', auth: true }
            ];

            CartFactory.getQtyTotal()
            .then(function(total){
                scope.qty = total;
            })

            scope.user = null;

            scope.confirmAge = function(label) {
                if(label === 'Jranks'){
                    window.confirm("Click OK if you are old enough to jrank!")
                }
            }

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            $rootScope.$on('cartUpdated', function () {
                CartFactory.getQtyTotal()
                .then(function(total){
                    scope.qty = total;
                })
            });

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});
