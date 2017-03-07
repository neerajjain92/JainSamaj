(function () {
    'use strict';

    function HomeService($http) {

        function getCommitteeMembers() {
            return $http({
                method: 'GET',
                url: 'data/committee_members.json',
                cache: false
            });
        }

        function getStateMaster() {
            return $http({
                method: 'GET',
                url: 'data/states.json',
                cache: false
            })
        }

        function getDashboardData() {
            return $http({
                method: 'GET',
                url: baseURL+'/rest/api/getDashboardData',
                cache: false
            })
        }

        // Return the factory itself with getter and setter functions.
        return {
            getCommitteeMembers: getCommitteeMembers,
            getStateMaster: getStateMaster,
            getDashboardData: getDashboardData
        };
    }

    angular.module('myApp')
        .factory('HomeService', HomeService);
}());
