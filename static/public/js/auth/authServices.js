(function () {
    'use strict';
    

    angular.module('auth.services', [])
        .factory('AuthenticationService', function Service($http, $localStorage, $q) {
            return {
                login: login,
                logout: logout
            };

            function login(username, password, callback) {
                var deferred = $q.defer()
                $http.post('/api/authenticate', { username: username, password: password})
                    .then(function (response) {
                        $localStorage.currentUser = { username: username, token: response.token, expires: response.expires};
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;
                        deferred.resolve($localStorage.currentUser)
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