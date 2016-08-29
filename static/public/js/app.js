(function () {
    'use strict';

    const app = angular.module('socket', [
        "auth.services",
        "auth.controllers",
        "home.controllers",
        "ngRoute"
    ])


    app.constant("viewsUrl", "/views/")

    app.config(function ($routeProvider, viewsUrl) {
        $routeProvider
            .when("/", {
                controller: 'HomeController',
                templateUrl: viewsUrl + 'home.html',
            })
    })   
})()