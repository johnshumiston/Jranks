app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state, AdminFactory) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {

            console.log(loginInfo)
            console.log(loginInfo.email)
            AdminFactory.resetMe(loginInfo)
            .then(function(data) {
              console.log("look!", data.reset)
              if (data.reset) $state.go('reset');
              else $state.go('home');
            })
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});