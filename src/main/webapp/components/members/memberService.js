(function () {
    'use strict';

    function MemberService($http) {

        function getStateMaster() {
            return $http({
                method: 'GET',
                url: 'data/states.json',
                cache: false
            })
        }

        function addMemberDetails(_payload) {
            return $http({
                method: 'POST',
                url: baseURL+'/rest/member/addMember',
                data: _payload
            });
        }

        function getDeserts() {
            return $http({
                method: 'GET',
                url: 'data/deserts.json',
                cache: false
            })
        }

        function getMembers(createdBy) {
            return $http({
                method: 'GET',
                url: baseURL+'/rest/member/getMembers/'+createdBy,
                cache: false
            });
        }

        function deleteMember(memberId) {
            return $http({
                method: 'DELETE',
                url: baseURL+'/rest/member/deleteMember/'+memberId
            });
        }

        function getHeadOfFamily() {
            return $http({
                method: 'GET',
                url: baseURL+'/rest/member/getHeadOfFamily/',
                cache: false
            });
        }

        // Return the factory itself with getter and setter functions.
        return {
            getStateMaster: getStateMaster,
            addMemberDetails: addMemberDetails,
            getDeserts: getDeserts,
            getMembers: getMembers,
            deleteMember: deleteMember,
            getHeadOfFamily: getHeadOfFamily
        };
    }

    angular.module('myApp')
        .factory('MemberService', MemberService);
}());
