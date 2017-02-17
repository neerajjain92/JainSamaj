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

        function forgotPassword(_payload) {
            return $http({
                method: 'POST',
                url: baseURL+'/rest/api/forgotPassword',
                data: _payload
            })
        }

        function changePassword(_payload) {
            return $http({
                method: 'POST',
                url: baseURL+'/rest/api/changePassword',
                data: _payload
            })
        }

        function uploadProfilePicture(_payload) {
            return $http({
                method: 'POST',
                url: baseURL+'/rest/api/uploadProfilePicture',
                data: _payload
            });
        }

        // Return the factor itself with setters and getters
        return {
            doLogin: doLogin,
            createUser: createUser,
            doLogout: doLogout,
            checkIfLoggedIn: checkIfLoggedIn,
            forgotPassword: forgotPassword,
            changePassword: changePassword,
            uploadProfilePicture: uploadProfilePicture
        };
    }

    angular.module('myApp')
        .factory('LoginService', LoginService);

}());
