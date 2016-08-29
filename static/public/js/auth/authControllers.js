(function () {
    'use strict';
    angular.module('auth.controllers', [])
        .controller('AuthController', function ($scope) {
            $scope.usernameFocus = false
            $scope.passwordFocus = false
            $scope.username = ""
            $scope.password = ""
        })
})();