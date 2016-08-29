(function () {
    'use strict';
    angular.module('home.controllers', [])
        .controller('HomeController', function ($scope, $controller) {
            $controller("AuthController", {$scope: $scope})
        })
})();