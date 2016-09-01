(function () {
    'use strict';
    angular.module('auth.controllers', [])
        .controller('AuthController', function ($scope) {
            // Maybe this could be a directive
            $scope.usernameFocus = false
            $scope.passwordFocus = false
            $scope.username = ""
            $scope.password = ""
        })
})();