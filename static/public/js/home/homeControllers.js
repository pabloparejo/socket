(function () {
    'use strict';
    angular.module('home.controllers', [])
        .controller('HomeController', function ($scope, $controller) {
            $controller("AuthController", {$scope: $scope})

            $scope.performLogin = function () {
                $scope.login().then((data) => console.log(data))
            }

        })
})();