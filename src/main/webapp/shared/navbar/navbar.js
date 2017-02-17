angular.module('myApp')
    .controller('navBarController', ['$rootScope','$scope','$sessionStorage','$state','LoginService','$cookies','$mdDialog','notify', function ($rootScope,$scope, $sessionStorage, $state, LoginService, $cookies, $mdDialog, notify) {

        $rootScope.isUserLoggedIn = ($sessionStorage.userProfile != null);

        if($rootScope.isUserLoggedIn){
            $rootScope.userProfile = $sessionStorage.userProfile;
        }else{
            $rootScope.userProfile = null;
        }

        $scope.doLogout = function(){
            $sessionStorage.$reset();
            notify.closeAll();
            $cookies.remove("AuthenticationKey");
            LoginService.doLogout();
            $state.go('home');
        };

        $scope.uploadProfilePicture = function (ev) {
            $mdDialog.show({
                controller: UploadProfilePictureController,
                templateUrl: 'uploadProfilePicture.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:false,
                scope: $scope.$new()
            }).then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
        };

        $scope.changePassword = function (ev) {
            $mdDialog.show({
                controller: ChangePasswordController,
                templateUrl: 'changePassword.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:false,
                scope: $scope.$new()
            }).then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
        };

        function UploadProfilePictureController($scope, $mdDialog) {
            $scope.myImage='';
            $scope.myCroppedImage='';

            var handleFileSelect=function(evt) {
                var file=evt.currentTarget.files[0];
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function($scope){
                        $scope.myImage=evt.target.result;
                    });
                };
                reader.readAsDataURL(file);
            };
            angular.element(document).ready(function () {
                angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
            });

            $scope.uploadProfilePicture = function () {
                notify({
                    message: "Feature Under Development, We'll be up soon :)",
                    templateUrl: '/shared/notification/notification-error.tmpl.html',
                    position: 'center'
                });
            };

            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
        }

        function ChangePasswordController($scope, $mdDialog) {
            $scope.changePasswordObject = {
              currentPassword: null,
              newPassword: null
            };

            $scope.changePassword = function () {
                console.log($scope.changePasswordObject);
                $rootScope.showLoader = true;
                LoginService.changePassword($scope.changePasswordObject).then(function (response) {
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
                        $mdDialog.hide();
                        notify({
                            message: response.message,
                            templateUrl: '/shared/notification/notification-success.tmpl.html',
                            position: 'center'
                        });
                    }
                });
            };

            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
        }

    }]);


