angular.module('myApp')
    .controller('homeController', ['$scope','HomeService', '$rootScope', '$timeout', function ($scope, HomeService, $rootScope, $timeout) {

        $scope.commmitteeMembers = [];
        $scope.members = [];
        $scope.invitedMembers = [];

        $scope.items = [
            {imgSrc: '1.JPG', label: 'label 1'},
            {imgSrc: '2.jpg', label: 'label 2'},
            {imgSrc: '3.jpg', label: 'label 3'},
            {imgSrc: '4.JPG', label: 'label 4'},
            {imgSrc: '5.jpg', label: 'label 5'},
            {imgSrc: '6.png', label: 'label 6'},
            {imgSrc: '7.png', label: 'label 7'},
            {imgSrc: '8.jpg', label: 'label 8'}
        ];

        HomeService.getCommitteeMembers().then(function (response) {
            var members = response.data._results;
            angular.copy(members, $scope.commmitteeMembers);
        });

        $scope.dataLoaded = true;

        var today = new Date();
        var year = today.getUTCFullYear();
        var month = today.toLocaleString("en-us",{month: "long"});

        $scope.currentMonth = month+" "+year;

        $rootScope.showLoader = true;
        $timeout(function () {
            $rootScope.showLoader = false;
        },100);


        //Loading Dashboard Data
        $scope.totalThirthankars = 0;
        $scope.totalMembers = 0;
        $scope.dashboard_1_populated = false;
        $scope.dashboard_3_populated = false;

        $scope.loadDashboard = function () {

            if($scope.dashboard_1_populated && $scope.dashboard_3_populated){
              $scope.$broadcast('dataloaded');
            }

            if($scope.totalThirthankars == 24){
                $scope.dashboard_1_populated = true;
            }else {
                $scope.totalThirthankars = $scope.totalThirthankars + 1;
            }

            if($scope.totalMembers == 583){
                $scope.dashboard_3_populated = true;
            }else {
                $scope.totalMembers = $scope.totalMembers+1;
            }

            mytimeout = $timeout($scope.loadDashboard);
        }

        var mytimeout = $timeout($scope.loadDashboard);
        
        $scope.$on('dataloaded', function () {
           $timeout.cancel(mytimeout);
        });

    }]);