angular.module('myApp').
factory('authenticationInterceptor',['$q','$rootScope','$location','$sessionStorage','$cookies',function($q,$rootScope,$location,$sessionStorage,$cookies){
    $rootScope.pendingRequests = 0;

    return {
        'request': function (config) {
            $rootScope.pendingRequests++;
            return config || $q.when(config);
        },

        'requestError': function(rejection) {
            $rootScope.pendingRequests--;
            return $q.reject(rejection);
        },

        'response': function(response) {
            $rootScope.pendingRequests--;
            return response || $q.when(response);
        },

        'responseError': function(rejection) {
            $sessionStorage.$reset();
            $cookies.remove("AuthenticationKey");
            $location.path("/home");
            return $q.reject(rejection);
        }
    }
}]);
