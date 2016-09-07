(function () {
    'use strict';
    

    angular.module('auth.services', ["ngStorage"])
        .factory('AuthenticationService', function Service($http, $localStorage, $q) {
            return {
                login: login,
                logout: logout
            };

            function login(username, password) {
                var deferred = $q.defer()
                $http.post('/api/authenticate', { username: username, password: password})
                    .then(function (response) {
                        var data = response.data
                        $localStorage.token = data.token
                        $localStorage.tokenExpires = data.expires
                        $http.defaults.headers.common.Authorizationasf = 'Bearer ' + response.token;
                        deferred.resolve(response)
                    })
                    .catch(function (status, error) {
                        deferred.reject({status: status, error: error})
                    });
                    return deferred.promise
            }

            function logout() {
                // remove user from local storage and clear http auth header
                delete $localStorage.currentUser;
                $http.defaults.headers.common.Authorization = '';
            }
        })
})();