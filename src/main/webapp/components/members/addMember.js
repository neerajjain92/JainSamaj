angular.module('myApp')
    .controller('addMemberController', ['$scope','$rootScope','$http','$state', 'MemberService', 'LoginService', '$sessionStorage','notify', function ($scope,$rootScope,$http, $state, MemberService,LoginService , $sessionStorage, notify) {

        MemberService.getHeadOfFamily().then(function (response) {
            response = response.data;
            responseStatus = response.status;

            if(responseStatus == "fail"){
                notify.closeAll();
                notify({
                    message: 'Please Register yourself as a member to get details pre-populated for your family members',
                    templateUrl: 'shared/notification/notification-success.tmpl.html',
                    position: 'center',
                });
            }else{
                headOfFamily = response.headOfFamily;
                $scope.member.residentialAddress = headOfFamily.residentialAddress;
                $scope.member.officeAddress = headOfFamily.officeAddress;
                $scope.member.state = headOfFamily.state;
                $scope.member.city = headOfFamily.city;
                $scope.member.pinCode = headOfFamily.pinCode;
                $scope.member.mobileNumber = headOfFamily.mobileNumber;
            }
        });

        $scope.relationMst = ["Self",
                              "Father",
                              "Mother",
                              "Sister",
                              "Brother",
                              "Wife",
                              "Son",
                              "Daughter",
                              "Friend",
                              "Brother-In-Law",
                              "Sister-In-Law",
                              "Son-In-Law",
                              "Daughter In Law",
                              "Grand Daughter",
                              "Grand Son"];

        $scope.member = {
            firstName:null,
            middleName:null,
            lastName:null,
            relationWithApplicant:null,
            dob:null,
            anniversaryDate:null,
            gender:null,
            maritalStatus:null,
            residentialAddress:null,
            officeAddress:null,
            state:null,
            city:null,
            pinCode:null,
            mobileNumber:null,
            landLineNumber:null,
            occupationProfile:null,
            nativePlace:null,
            emailId:null,
            feedback:null,
            associationWithOtherOrganisation:null,
            specialInterest:null,
            allottedMemberId:null,
            createdById:null,
            creationDtm:null
        };

        $scope.addMemberDetails = function () {
            var _memberPayload = $scope.member;
            MemberService.addMemberDetails(_memberPayload).then(function (response) {
                var response = response.data;
                var requestStatus = response.status;
                if(requestStatus === "fail"){
                    notify({
                        message: response.error,
                        templateUrl: 'shared/notification/notification-error.tmpl.html',
                        position: 'center',
                    });
                    return false;
                }else{
                    notify({
                        message: "Thanks :), Member Added Successfully and It's generated Id : "+response.memberId,
                        classes: 'alert-success',
                        position: 'center',
                    });
                    $state.go('membersList');
                }
            });
        };

        MemberService.getStateMaster().then(function (response) {
                var states = response.data.states;
                $scope.states = states;
        });
    }]);

angular.module('myApp')
    .controller('membersListController',['$scope','MemberService','$timeout','notify','$sessionStorage', '$mdDialog', function ($scope, MemberService, $timeout, notify, $sessionStorage, $mdDialog) {

        MemberService.getMembers('test').then(function (response) {
        });

        var userProfile = $sessionStorage.userProfile;

        $scope.selected = [];

        $scope.options = {
            rowSelection: false,
            multiSelect: false,
            autoSelect: true,
            decapitate: false,
            largeEditDialog: false,
            boundaryLinks: true,
            limitSelect: true,
            pageSelect: true
        };

        $scope.loadStuff = function () {
            $scope.promise = $timeout(function () {
                MemberService.getMembers(userProfile.users.userName).then(function (response) {
                    $scope.members = response.data.members;
                });
            },500);
        };

        $scope.query = {
            order: 'name',
            limit: 10,
            page: 1
        };

        $scope.hideFilter = true; // Initially don't show the Search Bar

        $scope.logPagination = function (page, limit) {
            console.log('page: ', page);
            console.log('limit: ', limit);
        };

        MemberService.getMembers(userProfile.users.userName).then(function (response) {
            $scope.members = response.data.members;
        });

        $scope.deleteMember = function(ev, member) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Would you like to delete this member ?')
                .textContent('Information of this member will no longer be retrieved.')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Please do it!')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function() {
                MemberService.deleteMember(member.memberId).then(function (response) {
                    response = response.data;
                    var requestStatus = response.status;
                    if(requestStatus === "fail"){
                        notify({
                            message: response.error,
                            templateUrl: 'shared/notification/notification-error.tmpl.html',
                            position: 'center',
                        });
                        return false;
                    }else {
                        notify({
                            message: response.message,
                            templateUrl: 'shared/notification/notification-success.tmpl.html',
                            position: 'center',
                        });
                        $scope.loadStuff();
                    }
                });
            }, function() {
                $scope.status = 'You decided to keep your debt.';
            });
        };

        $scope.viewMemberDetails = function (ev, member) {
            $scope.selectedMember = member;
            $mdDialog.show({
                controller: ViewMemberDialogController,
                templateUrl: 'viewMemberDetails.tmpl.html',
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

        function ViewMemberDialogController($scope, $mdDialog) {
            $scope.selected = null;

            $scope.sendEmail = function(email, subject, body) {
                var link = "mailto:"+ email
                    + "?subject=New%20email " + escape(subject)
                    + "&body=" + escape(body);

                window.location.href = link;
            };

            $scope.hide = function() {
                $scope.loadStuff();
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $scope.loadStuff();
                $mdDialog.cancel();
            };

            $scope.answer = function(answer) {
                $scope.loadStuff();
                $mdDialog.hide(answer);
            };
        }

}]);
