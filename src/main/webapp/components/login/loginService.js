(function () {
    'use strict;'

    function LoginService($http) {

        function doLogin(_payload) {
            return $http({
                method: 'POST',
                url: baseURL+'/rest/api/login',
                data: _payload
            });
        }

        function doLogout() {
            return $http({
                method: 'GET',
                url: baseURL+'/rest/api/signOut'
            });
        }

        function createUser(_payload) {
            return $http({
                method: 'POST',
                url: baseURL+'/rest/api/signup',
                data: _payload
            });
        }

        function checkIfLoggedIn() {
            return $http({
                method: 'GET',
                url: baseURL+'/rest/api/isUserLoggedIn'
            });
        }

        // Return the factor itself with setters and getters
        return {
            doLogin: doLogin,
            createUser: createUser,
            doLogout: doLogout,
            checkIfLoggedIn: checkIfLoggedIn
        };
    }

    angular.module('myApp')
        .factory('LoginService', LoginService);

}());