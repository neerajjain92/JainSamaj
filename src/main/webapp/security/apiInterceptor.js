angular.module('myApp').
factory('authenticationInterceptor',['$q','$rootScope','$location',function($q,$rootScope,$location){
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
            switch(rejection.status){
                case 403:
                    $location.path("/home");
                    break;
                case 500:
                    $location.path("/home");
                    break;
                case 404:
                    $location.path("/home");
                    break;

            }
            return $q.reject(rejection);
        }
    }
}]);
