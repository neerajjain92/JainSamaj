angular.module('myApp')
    .controller('homeController', ['$scope','HomeService', '$rootScope', '$timeout', 'uiCalendarConfig', '$mdDialog', function ($scope, HomeService, $rootScope, $timeout, uiCalendarConfig, $mdDialog) {

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

        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();


        // Configuration for Calendar

        $scope.uiConfig = {
          calendar: {
              editable: false,
              header:{
                  right: 'title',
                  left: 'today prev,next'
              },
              eventClick: function(date , jsEvent, view){
                      $scope.alertOnEventClick(date, jsEvent, view);
              },
              eventDrop: $scope.alertOnDrop,
              eventResize: $scope.alertOnResize,
              eventRender: $scope.eventRender
          }
        };

        /* event source that contains custom events on the scope */
        $scope.events = [
            {title: 'All Day Event',start: new Date(y, m, 1)},
            {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
            {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
            {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
            {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false}
            // {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ];

        /* add custom event*/
        $scope.addEvent = function() {
            $scope.events.push({
                title: 'Open Sesame',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                className: ['openSesame']
            });
        };

        $scope.addEvent();

        $scope.eventSources = [$scope.events];

        /* alert on eventClick */
        $scope.alertOnEventClick = function( date, jsEvent, view){
            $scope.clickedEvent = date;
            $mdDialog.show({
                controller: CalendarEventController,
                templateUrl: 'calendarEventDetail.html',
                targetEvent: document.body,
                clickOutsideToClose:true,
                scope: $scope.$new()
            }).then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
        };

        function CalendarEventController($scope, $mdDialog) {

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

        /* alert on Drop */
        $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
            alert('Event Droped to make dayDelta ' + delta);
        };
        /* alert on Resize */
        $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
            alert('Event Resized to make dayDelta ' + delta);
        };
        /* Render Tooltip */
        $scope.eventRender = function( event, element, view ) {
            element.attr({'tooltip': event.title,
                'tooltip-append-to-body': true});
            $compile(element)($scope);
        };

        /* Change View */
        $scope.changeView = function(view,calendar) {
            uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
        };


        HomeService.getCommitteeMembers().then(function (response) {
            var members = response.data._results;
            angular.copy(members, $scope.commmitteeMembers);
        });

        /**
         * Dashboard Stats
         */
        HomeService.getDashboardData().then(function (response) {
            var dashboardData = response.data;
            var status = dashboardData.status;

            if(status == "fail") {
                notify({
                    message: dashboardData.error,
                    templateUrl: 'shared/notification/notification-error.tmpl.html',
                    position: 'center',
                });
            }else{
                var result = dashboardData._result;
                //Loading Dashboard Data
                $scope.totalThirthankars = 0;
                $scope.totalMembers = 0;
                $scope.dashboard_1_populated = false;
                $scope.dashboard_3_populated = false;
                $scope.newMembers = result.newMembers;

                $scope.loadDashboard = function () {

                    if($scope.dashboard_1_populated && $scope.dashboard_3_populated){
                        $scope.$broadcast('dataloaded');
                    }

                    if($scope.totalThirthankars == 24){
                        $scope.dashboard_1_populated = true;
                    }else {
                        $scope.totalThirthankars = $scope.totalThirthankars + 1;
                    }

                    if($scope.totalMembers == result.totalMembersJoined){
                        $scope.dashboard_3_populated = true;
                    }else {
                        $scope.totalMembers = $scope.totalMembers+1;
                    }

                    mytimeout = $timeout($scope.loadDashboard);
                };

                var mytimeout = $timeout($scope.loadDashboard);

                $scope.$on('dataloaded', function () {
                    $timeout.cancel(mytimeout);
                });
            }
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

    }]);
