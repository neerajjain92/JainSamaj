angular.module('myApp')
    .controller('loginController', ['$scope', 'LoginService', '$state', 'notify','$sessionStorage', '$stateParams', '$rootScope', function ($scope, LoginService, $state, notify, $sessionStorage, $stateParams, $rootScope) {

        $scope.newUser = {
            firstName:null,
            lastName:null,
            userName:null,
            password:null
        };

        $scope.existingUser = {
            userName:null,
            password:null
        };

        if($stateParams.selectedTab){
            $scope.selectedTab = parseInt($stateParams.selectedTab)-1;
        }

        $scope.login = function () {
            $rootScope.showLoader = true;
            notify.closeAll();
            var loginPayload = $scope.existingUser;
            LoginService.doLogin(loginPayload).then(function (response) {
                var response = response.data;
                var requestStatus = response.status;
                if(requestStatus === "fail"){
                    $rootScope.showLoader = false;
                    notify({
                        message: response.error,
                        classes: 'alert-danger',
                        position: 'center',
                    });
                    return false;
                }else{
                    $rootScope.showLoader = false;
                    $sessionStorage.userProfile = response.userProfile;
                    notify({
                        message: 'Welcome ['+$scope.existingUser.userName+'] you logged In Successfully !!',
                        classes: 'alert-success',
                        position: 'center',
                    });
                    $state.go('addMember');
                }
            });

        };

        $scope.createUser = function () {
            $rootScope.showLoader = true;
            notify.closeAll();
            var loginPayload = $scope.newUser;
            LoginService.createUser(loginPayload).then(function (response) {
                var response = response.data;
                var requestStatus = response.status;
                if(requestStatus === "fail"){
                    $rootScope.showLoader = false;
                    notify({
                        message: response.error,
                        classes: 'alert-dander',
                        position: 'center',
                    });
                    return false;
                }else{
                    $rootScope.showLoader = false;
                    $sessionStorage.userProfile = response;
                    notify({
                        message: 'User with userName : [ '+ $scope.newUser.userName+' ] Created Successfully, Please login Now!!',
                        classes: 'alert-success',
                        position: 'center',
                    });
                }
            });
        }

}]);


