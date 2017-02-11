angular.module('myApp')
    .controller('navBarController', ['$rootScope','$scope','$sessionStorage','$state','LoginService','$cookies', function ($rootScope,$scope, $sessionStorage, $state, LoginService, $cookies) {

        $rootScope.isUserLoggedIn = ($sessionStorage.userProfile != null);

        if($rootScope.isUserLoggedIn){
            $rootScope.userProfile = $sessionStorage.userProfile;
        }else{
            $rootScope.userProfile = null;
        }

        $scope.doLogout = function(){
            $sessionStorage.$reset();
            $cookies.remove("AuthenticationKey");
            LoginService.doLogout();
            $state.go('home');
        }
    }]);


