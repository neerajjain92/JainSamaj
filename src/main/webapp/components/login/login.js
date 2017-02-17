angular.module('myApp')
    .controller('loginController', ['$scope', 'LoginService', '$state', 'notify','$sessionStorage', '$stateParams', '$rootScope', '$mdDialog', function ($scope, LoginService, $state, notify, $sessionStorage, $stateParams, $rootScope, $mdDialog) {

        $scope.newUser = {
            firstName:null,
            lastName:null,
            userName:null,
            password:null,
            mobileNumber:null,
            emailId:null
        };

        $scope.existingUser = {
            userName:null,
            password:null
        };

        $scope.forgotPasswordObject = {
            emailId:null
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
                        templateUrl: '/shared/notification/notification-error.tmpl.html',
                        position: 'center',
                    });
                    return false;
                }else{
                    $rootScope.showLoader = false;
                    $sessionStorage.userProfile = response.userProfile;
                    notify({
                        message: 'Welcome '+response.userProfile.users.firstName+', You logged In Successfully !!',
                        templateUrl: '/shared/notification/notification-success.tmpl.html',
                        position: 'center',
                    });
                    $state.go('addMember');
                }
            });

        };

        $scope.createUser = function () {
            $rootScope.showLoader = true;
            notify.closeAll();
            console.log($scope.newUser);
            var loginPayload = $scope.newUser;
            LoginService.createUser(loginPayload).then(function (response) {
                var response = response.data;
                var requestStatus = response.status;
                if(requestStatus === "fail"){
                    $rootScope.showLoader = false;
                    notify({
                        message: response.error,
                        templateUrl: '/shared/notification/notification-error.tmpl.html',
                        position: 'center'
                    });
                    return false;
                }else{
                    $rootScope.showLoader = false;
                    $sessionStorage.userProfile = response;
                    notify({
                        message: response.note,
                        templateUrl: '/shared/notification/notification-success.tmpl.html',
                        position: 'center',
                    });
                }
            });
        }

        $scope.forgotPassword = function (ev) {

            var confirm = $mdDialog.prompt()
                .title('Forgot Password!')
                .textContent('Please Enter Your Registered Email Address')
                .placeholder('Registered Email Address')
                .ariaLabel('Registered Email Address')
                .targetEvent(ev)
                .ok('Send Password!')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function(response) {
                console.log(response);
                $rootScope.showLoader = true;
                $scope.forgotPasswordObject.emailId = response;
                LoginService.forgotPassword($scope.forgotPasswordObject).then(function (response) {
                    response = response.data;
                    var requestStatus = response.status;
                    if(requestStatus === "fail"){
                        $rootScope.showLoader = false;
                        notify({
                            message: response.error,
                            templateUrl: '/shared/notification/notification-error.tmpl.html',
                            position: 'center'
                        });
                        return false;
                    }else{
                        $rootScope.showLoader = false;
                        notify({
                            message: "Password Sent to Registered Email Id, Please check and login",
                            templateUrl: '/shared/notification/notification-success.tmpl.html',
                            position: 'center'
                        });
                    }
                });
            }, function () {
            });
        }

}]);


