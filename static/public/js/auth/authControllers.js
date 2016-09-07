(function () {
    'use strict';
    angular.module('auth.controllers', [])
        .controller('AuthController', function ($scope, AuthenticationService) {
            /* Provides a series of functions and variables to perform login */
            // Maybe this could be a directive
            $scope.usernameFocus = false
            $scope.passwordFocus = false
            $scope.username = ""
            $scope.password = ""

            $scope.login = function () {
                return AuthenticationService.login($scope.username, $scope.password)
            }
        })
})();